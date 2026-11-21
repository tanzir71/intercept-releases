// Isolated local-page layout checks; no hooks, input injection or OS clipboard.
const {app,BrowserWindow,session}=require('electron');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),live=process.argv.includes('--live'),noContainerQueries=process.argv.includes('--no-container-queries'),base='https://tanzir71.github.io/intercept-releases/',out=path.join(root,'.build',(live?'responsive-sections-live':'responsive-sections')+(noContainerQueries?'-fallback':''));fs.mkdirSync(out,{recursive:true});
app.disableHardwareAcceleration();app.setPath('userData',path.join(out,'browser-profile'));app.on('window-all-closed',()=>{});
let win;const results=[];
app.whenReady().then(async()=>{
 session.defaultSession.setPermissionRequestHandler((_w,_p,done)=>done(false));
 session.defaultSession.webRequest.onBeforeRequest((details,done)=>done({cancel:/^https?:/.test(details.url)&&!(live&&details.url.startsWith(base))}));
 win=new BrowserWindow({width:1057,height:1100,show:false,webPreferences:{offscreen:true,sandbox:true,contextIsolation:true,nodeIntegration:false}});
 for(const width of [320,390,640,767,768,800,959,960,1008,1024,1028,1057,1199,1200,1279,1280,1440]){
  win.setContentSize(width,1100);
  for(const page of ['input-protection','attribution']){
   if(live)await win.loadURL(base+page+'.html');else await win.loadFile(path.join(root,page+'.html'));
   if(noContainerQueries)await win.webContents.executeJavaScript(`(()=>{function removeQueries(sheet){for(let i=sheet.cssRules.length-1;i>=0;i--){const rule=sheet.cssRules[i];if(rule.constructor.name==='CSSContainerRule')sheet.deleteRule(i);else if(rule.cssRules)removeQueries(rule)}}for(const sheet of document.styleSheets)removeQueries(sheet)})()`);
   const result=await win.webContents.executeJavaScript(`(async()=>{await document.fonts.ready;const page=${JSON.stringify(page)},row=document.querySelector(page==='attribution'?'.attribution-flow':'[data-node-id="85:671"]');row.scrollIntoView({block:'start',behavior:'instant'});await new Promise(r=>setTimeout(r,100));const bounds=row.getBoundingClientRect(),cards=Array.from(row.children).filter(n=>n.classList.contains('layout-stack')).map(n=>{const b=n.getBoundingClientRect();return {width:b.width,height:b.height,top:b.top,bottom:b.bottom,left:b.left,right:b.right}});const result={page,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,stacked:getComputedStyle(row).flexDirection==='column',bounds:{left:bounds.left,right:bounds.right,top:bounds.top,bottom:bounds.bottom},cards};if(page==='input-protection'){const cell=row.querySelector('thead th:last-child');result.exampleWidth=cell?.getBoundingClientRect().width??0;}return result})()`);
   assert(result.scrollWidth<=width,page+' page overflow '+width);
   if(page==='attribution'){
    if(noContainerQueries)assert(result.stacked,'Diagram fallback must stack '+width);
    assert.equal(result.cards.length,3);assert(result.cards.every(card=>card.width>=144),'Compressed attribution card '+width);assert(result.cards[2].height<=132,'Vertical-letter result '+width);
    for(const [i,card] of result.cards.entries()){
     assert(card.left>=result.bounds.left&&card.right<=result.bounds.right,'Card outside diagram '+width);
     if(i)assert(result.stacked?card.top>=result.cards[i-1].bottom:card.left>=result.cards[i-1].right,'Overlapping cards '+width);
     if(result.stacked)assert(Math.abs(card.width-result.cards[0].width)<2,'Unequal stacked cards '+width);
    }
   }
   else if(width<1280){assert(result.cards[1].top>=result.cards[0].bottom-1,'Protected apps must stack '+width);assert(Math.abs(result.cards[0].width-result.cards[1].width)<2,'Unequal stacked widths '+width);if(width>767)assert(result.exampleWidth>=100,'Compressed example column '+width);}
   results.push(result);if([390,768,1028,1057].includes(width))fs.writeFileSync(path.join(out,page+'-'+width+'.png'),(await win.webContents.capturePage()).toPNG());
  }
 }
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({passed:true,live,noContainerQueries,checks:results.length,results},null,2));console.log(JSON.stringify({passed:true,live,noContainerQueries,checks:results.length,out}));win.destroy();app.quit();
}).catch(error=>{console.error(error);if(win&&!win.isDestroyed())win.destroy();app.exit(1)});
