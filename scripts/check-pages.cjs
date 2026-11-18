const {JSDOM}=require('jsdom');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
function checkPages(root){
 const config=JSON.parse(fs.readFileSync(path.join(root,'release-config.json')));
 const latest=config.releases.find(r=>r.version===config.latest);
 assert(latest,'Missing latest release');
 const provenance=JSON.parse(fs.readFileSync(path.join(root,'binary-provenance.json')));
 assert.equal(latest.version,provenance.version);assert.deepEqual(latest.installer,provenance.installer);
 const records=fs.readdirSync(path.join(root,'releases')).filter(f=>f.endsWith('.md')).map(f=>f.slice(0,-3));
 assert.deepEqual(config.releases.map(r=>r.version).sort(),records.sort());
 for(const r of config.releases){assert(/^[a-f0-9]{64}$/.test(r.installer.sha256));assert(Number.isSafeInteger(r.installer.bytes)&&r.installer.bytes>0);assert(/^\d{4}-\d{2}-\d{2}$/.test(r.date))}
 const download='https://github.com/tanzir71/intercept-releases/releases/download/v'+latest.version+'/'+latest.installer.name;
 const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
 const docs=new Map(files.map(f=>[f,new JSDOM(fs.readFileSync(path.join(root,f),'utf8')).window.document]));
 for(const [file,doc] of docs){
  assert.equal(doc.querySelectorAll('h1').length,1,file+' h1 count');
  assert(!doc.documentElement.outerHTML.includes('{{'),file+' unresolved release facts');
  const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size,file+' duplicate ids');
  for(const a of doc.links){
   const href=a.getAttribute('href');assert(href,file+' dead link: '+a.textContent);
   if(/^(https?:|mailto:)/.test(href))continue;
   const u=new URL(href,'https://local.invalid/'+file);let target=decodeURIComponent(u.pathname).slice(1);if(!target||target.endsWith('/'))target+='index.html';
   assert(fs.existsSync(path.join(root,target)),file+' missing file '+href);
   if(u.hash)assert(docs.get(target)?.getElementById(decodeURIComponent(u.hash.slice(1))),file+' missing fragment '+href);
  }
  for(const img of doc.images){assert(img.getAttribute('src')?.startsWith('./assets/'));assert(fs.statSync(path.join(root,img.getAttribute('src'))).size>0)}
  for(const b of doc.querySelectorAll('[data-copy]'))assert(b.hidden,file+' copy control must be hidden without JS');
  assert(doc.querySelector('meta[http-equiv="Content-Security-Policy"]').content.includes("connect-src 'none'"));
 }
 assert.equal(files.length,14);
 assert.equal(docs.get('download.html').querySelector('meta[http-equiv="refresh"]').content,'1;url='+download);
 const anchors={'download.html':['install'],'docs.html':['source','updates','privacy','preview-status','topics'],'security.html':['at-a-glance','local-by-design','what-is-recorded','permissions','input-evidence','trusted-agents','locked-findings','verify','known-limits','report'],'input-protection.html':['how-it-works','levels','protected-apps','coverage','with-ai-agents'],'ai-agents.html':['two-ways','verification','coding-sessions','guardrails','labels'],'alerts.html':['example','grouping','always-alerts','acting'],'advanced-mode.html':['overview','settings','alerts-and-rules','agents','compare'],'attribution.html':['overview','anatomy','identity','agents','confidence','limits'],'coverage.html':['summary','input-routes','other-signals','guard-limits','agent-allowances','verification-status'],'build.html':['before-you-start','prerequisites','desktop','checks','website','check-installer'],'pricing.html':['plans','questions'],'notices.html':['desktop-app','website','trademarks']};
 for(const [file,list] of Object.entries(anchors))for(const id of list)assert(docs.get(file).getElementById(id),file+'#'+id);
 const landing=docs.get('index.html');assert(!landing.getElementById('pricing'));
 for(const [node,label,href] of [
  ['52:497','How attribution works','./attribution.html'],['55:940','Read the input protection brief','./input-protection.html'],['55:1292','How agent attribution works','./attribution.html#agents'],['55:1708','See an example alert','./alerts.html#example'],['55:1992','Tour Advanced mode','./advanced-mode.html'],['57:286','Full coverage notes','./coverage.html']
 ]){
  const e=landing.querySelector('[data-node-id="'+node+'"]');assert(e,'Missing CTA '+node);
  const a=e.closest('a')||[...e.querySelectorAll('a')].find(a=>a.textContent.includes(label));assert.equal(a?.getAttribute('href'),href,label);
 }
 const downloads=[...landing.links].filter(a=>a.textContent.trim()==='Download for Windows');assert(downloads.length>=4&&downloads.every(a=>a.getAttribute('href')==='./download.html'));
 assert(landing.querySelector('.utility-bar').textContent.includes('Intercept Preview '+latest.version.split('.').at(-1)+' for Windows 11 is available.'));
 assert(!/open.source/i.test(landing.body.textContent),'D40 desktop open-source claim remains');
 assert.equal(docs.get('releases.html').querySelectorAll('.release-entry').length,config.releases.length);
 assert.equal(docs.get('releases.html').querySelectorAll('.release-heading .info').length,1);
 assert(!docs.get('releases.html').body.textContent.includes('[current availability]'),'Release Markdown link was not rendered');
 assert(!docs.get('build.html').body.textContent.includes('https://github.com/tanzir71/intercept.git'));
 return {files,latest,download,links:[...docs.values()].reduce((n,d)=>n+d.links.length,0)};
}
module.exports=checkPages;
if(require.main===module){const r=checkPages(path.resolve(__dirname,'..'));console.log(JSON.stringify({passed:true,pages:r.files.length,links:r.links,release:r.latest.version}))}
