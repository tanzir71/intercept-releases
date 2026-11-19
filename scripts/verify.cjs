// Optional Chromium checks. Uses an isolated profile; no app, hooks or OS clipboard.
const {app,BrowserWindow,session}=require('electron');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||'.build/verification');
const {files,latest,download}=require('./check-pages.cjs')(root);
fs.mkdirSync(out,{recursive:true});
app.disableHardwareAcceleration();app.setPath('userData',path.join(out,'browser-profile'));
app.on('window-all-closed',()=>{});
let win,noJs;const external=[],attempts=[],metrics=[];
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const bounded=(promise,label)=>{let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Browser check timed out: '+label)),15000)})]).finally(()=>clearTimeout(timer))};
const evaluate=(fn,...args)=>win.webContents.executeJavaScript('('+fn.toString()+')('+args.map(a=>JSON.stringify(a)).join(',')+')');
const block=(event,url)=>{if(/^https?:/.test(url)){event.preventDefault();(url===download?attempts:external).push(url)}};
app.whenReady().then(async()=>{
 session.defaultSession.setPermissionRequestHandler((_w,_p,cb)=>cb(false));
 session.defaultSession.webRequest.onBeforeRequest((d,cb)=>{if(/^https?:/.test(d.url)){(d.url===download?attempts:external).push(d.url);cb({cancel:true})}else cb({})});
 win=new BrowserWindow({width:1440,height:1000,show:false,webPreferences:{offscreen:true,sandbox:true,contextIsolation:true,nodeIntegration:false}});
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));win.webContents.on('will-navigate',block);
 for(const width of [1440,1024,390]){
  win.setContentSize(width,1000);
  for(const file of files){
   await win.loadFile(path.join(root,file));await evaluate(async()=>{await document.fonts.ready;return true});await pause(file==='download.html'?1300:100);
   await evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null)}));return true});
   const m=await evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1:document.querySelector('h1').getBoundingClientRect().toJSON(),broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),overflow:[...document.querySelectorAll('main *')].filter(e=>{const b=e.getBoundingClientRect();return b.right>innerWidth+1&&b.width>0}).slice(0,10).map(e=>({node:e.dataset.nodeId,tag:e.tagName,right:e.getBoundingClientRect().right,text:e.textContent.slice(0,60)}))}));
   m.file=file;metrics.push(m);assert.equal(m.broken.length,0,file+' broken images');
   fs.writeFileSync(path.join(out,file.replace('.html','')+'-'+width+'.png'),(await win.webContents.capturePage()).toPNG());
  }
 }
 const responsive={passed:metrics.every(m=>m.scrollWidth<=m.width),pages:14,viewports:metrics.length,metrics};fs.writeFileSync(path.join(out,'responsive-verification.json'),JSON.stringify(responsive,null,2));for(const m of metrics)assert(m.scrollWidth<=m.width,m.file+' overflow '+m.width+': '+JSON.stringify(m.overflow));
 if(process.argv.includes('--responsive-only')){console.log(JSON.stringify({passed:true,pages:14,viewports:metrics.length}));win.destroy();app.quit();return;}
 await win.loadFile(path.join(root,'security.html'));
 const copy=await evaluate(async()=>{let copied;Object.defineProperty(navigator,'clipboard',{value:{writeText:async s=>{copied=s}},configurable:true});const b=document.querySelector('[data-copy]');b.click();await new Promise(r=>setTimeout(r,50));return {copied,status:b.closest('.code-block').querySelector('[data-copy-status]').textContent}});
 assert(copy.copied?.includes(latest.installer.sha256.toUpperCase())&&copy.status==='Copied');
 win.setContentSize(1440,1000);
 const spy=await evaluate(async()=>{document.getElementById('known-limits').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,400));return document.querySelector('.doc-toc a[aria-current]')?.hash});assert.equal(spy,'#known-limits');
 noJs=new BrowserWindow({width:390,height:844,show:false,webPreferences:{javascript:false,offscreen:true,sandbox:true,contextIsolation:true,nodeIntegration:false}});noJs.webContents.on('will-navigate',block);
 const before=attempts.length;await noJs.loadFile(path.join(root,'download.html'));await pause(1500);assert(attempts.length>before,'No-JS refresh did not attempt installer');noJs.destroy();noJs=null;
 const layout=JSON.parse(fs.readFileSync(path.join(root,'design/landing-subpages-layout.json')));
 const layoutResults=[];
 const previousWindow=win;
 win=new BrowserWindow({width:1440,height:1000,show:false,webPreferences:{offscreen:true,sandbox:true,contextIsolation:true,nodeIntegration:false,backgroundThrottling:false}});
 previousWindow.destroy();
 win.webContents.on('will-navigate',block);
 for(const [page,targets] of Object.entries(layout.pages)){
  fs.appendFileSync(path.join(out,'progress.log'),'Layout: '+page+'\n');
  win.setContentSize(1440,1000);await bounded(win.loadFile(path.join(root,page+'.html')),page+' load');
  const scrollbar=await evaluate(()=>innerWidth-document.documentElement.clientWidth);
  win.setContentSize(layout.contentWidth+scrollbar,1000);
  await bounded(evaluate(async()=>{document.body.offsetHeight;await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null)}));return true}),page+' images');
  await pause(150);
  const result=await evaluate(targets=>targets.map(t=>{const e=document.querySelector('[data-node-id="'+t.node+'"]');return {...t,actual:e?.getBoundingClientRect().toJSON()}}),targets);
  for(const t of result){assert(t.actual,page+' missing layout node '+t.node);for(const key of ['x','y','width','height'])assert(Math.abs(t.actual[key]-t[key])<=layout.tolerance+.01,page+' layout '+t.node+' '+key+': '+t.actual[key]+' vs '+t[key])}
  layoutResults.push({page,contentWidth:layout.contentWidth,targets:result.length,maxDifference:Math.max(...result.flatMap(t=>['x','y','width','height'].map(k=>Math.abs(t.actual[k]-t[k]))))});
  fs.writeFileSync(path.join(out,page+'-figma.png'),(await bounded(win.webContents.capturePage({x:0,y:0,width:1440,height:1000}),page+' capture')).toPNG());
 }
 const hero=[];await win.loadFile(path.join(root,'index.html'));
 for(const width of [390,1024,1280,1440,1855,1920,2560]){
  win.setContentSize(width,875);await pause(100);
  const g=await evaluate(()=>{const p=document.querySelector('[data-node-id="55:14"]').getBoundingClientRect(),s=document.querySelector('[data-node-id="52:53"]').getBoundingClientRect();return {width:innerWidth,panel:p.toJSON(),screen:s.toJSON(),difference:Math.abs((p.left+p.right-s.left-s.right)/2)}});
  hero.push(g);assert(g.panel.width<=1200.1&&g.difference<1&&g.screen.left>=g.panel.left&&g.screen.right<=g.panel.right,'Hero alignment '+width);
 }
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({passed:!external.length&&metrics.every(m=>m.scrollWidth<=m.width),pages:14,metrics,copy,spy,noJsDownload:true,downloadAttempts:attempts.length,external,hero,layoutResults},null,2));
 assert.equal(external.length,0,'Unexpected runtime requests');
 for(const m of metrics)assert(m.scrollWidth<=m.width,m.file+' overflow '+m.width+': '+JSON.stringify(m.overflow));
 console.log(JSON.stringify({passed:true,pages:14,viewports:metrics.length,copy:true,scrollspy:true,noJsDownload:true,externalRequests:0}));
 win.destroy();app.quit();
}).catch(e=>{console.error(e);for(const w of [win,noJs])if(w&&!w.isDestroyed())w.destroy();app.exit(1)});
