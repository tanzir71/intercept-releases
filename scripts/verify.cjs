// Focused local Chromium checks. No app launch, collector, hooks or user profile.
const {app,BrowserWindow,session}=require('electron');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const provenance=JSON.parse(fs.readFileSync(path.join(root,'binary-provenance.json'),'utf8'));
assert(/^\d+\.\d+\.\d+-preview\.\d+$/.test(provenance.version));
const release=`https://github.com/tanzir71/intercept-releases/releases/tag/v${provenance.version}`;
const download=`https://github.com/tanzir71/intercept-releases/releases/download/v${provenance.version}/${provenance.installer.name}`;
const out=path.resolve(process.argv[2]);
fs.mkdirSync(out,{recursive:true});
app.disableHardwareAcceleration();app.setPath('userData',path.join(out,'browser-profile'));
let win;
const external=[];
app.whenReady().then(async()=>{
  session.defaultSession.webRequest.onBeforeRequest((d,cb)=>{
    if(/^https?:/.test(d.url)){external.push(d.url);cb({cancel:true});}else cb({});
  });
  win=new BrowserWindow({width:1440,height:1400,show:false,webPreferences:{offscreen:true,sandbox:true,contextIsolation:true,nodeIntegration:false}});
  await win.loadFile(path.join(root,'index.html'));
  await win.webContents.executeJavaScript('document.fonts.ready.then(()=>true)');
  await new Promise(r=>setTimeout(r,350));
  const metrics=await win.webContents.executeJavaScript(`(()=>({width:innerWidth,height:document.documentElement.scrollHeight,
    images:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height})),
    links:[...document.links].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),
    faq:document.querySelectorAll('details').length,hero:document.querySelector('[data-node-id="52:28"]').getBoundingClientRect().toJSON(),
    heading:document.querySelector('h1').getBoundingClientRect().toJSON()}))()`);
  assert.equal(metrics.width,1440);assert.equal(metrics.faq,7);assert(metrics.images.every(i=>i.ok&&i.width>0&&i.height>0));
  const downloads=metrics.links.filter(a=>a.text==='Download for Windows');
  assert(downloads.length>0&&downloads.every(a=>a.href===download));
  assert(metrics.links.some(a=>a.href===release));
  assert(metrics.links.filter(a=>a.href?.includes('/releases/tag/')).every(a=>a.href===release));
  for(const a of metrics.links){if(a.href?.startsWith('#')&&a.href!=='#')assert(await win.webContents.executeJavaScript(`!!document.getElementById(${JSON.stringify(a.href.slice(1))})`),a.href);}
  assert.equal(external.length,0);
  fs.writeFileSync(path.join(out,'desktop.png'),(await win.webContents.capturePage()).toPNG());
  await win.webContents.executeJavaScript('scrollTo(0,6200)');await new Promise(r=>setTimeout(r,150));
  fs.writeFileSync(path.join(out,'modes.png'),(await win.webContents.capturePage()).toPNG());
  await win.webContents.executeJavaScript('scrollTo(0,11200)');await new Promise(r=>setTimeout(r,150));
  fs.writeFileSync(path.join(out,'faq.png'),(await win.webContents.capturePage()).toPNG());
  win.setContentSize(390,844);await win.webContents.executeJavaScript('scrollTo(0,0)');await new Promise(r=>setTimeout(r,250));
  const mobile=await win.webContents.executeJavaScript(`(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,heading:document.querySelector('h1').getBoundingClientRect().toJSON()}))()`);
  assert.equal(mobile.width,390);assert(mobile.heading.left>=0&&mobile.heading.right<=391);
  fs.writeFileSync(path.join(out,'mobile.png'),(await win.webContents.capturePage()).toPNG());
  const faqProof=await win.webContents.executeJavaScript(`(()=>{const d=document.querySelectorAll('details')[1];d.querySelector('summary').click();return d.open&&d.querySelector('p').textContent.length>30})()`);assert(faqProof);
  const report={passed:true,version:provenance.version,release,download,metrics,mobile,faqProof,externalRequests:external};fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:true,images:metrics.images.length,links:metrics.links.length,faq:metrics.faq,height:metrics.height,mobile:mobile.width,externalRequests:external.length}));
  win.destroy();app.quit();
}).catch(e=>{console.error(e);if(win&&!win.isDestroyed())win.destroy();app.exit(1)});
