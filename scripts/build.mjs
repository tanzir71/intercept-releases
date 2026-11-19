import fs from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require=createRequire(import.meta.url);
const files=fs.readdirSync(path.join(root,'src')).filter(n=>n.startsWith('section-')&&n.endsWith('.jsx'));
const names=new Set();
for(const file of files){
  const code=fs.readFileSync(path.join(root,'src',file),'utf8');
  for(const [,raw] of code.matchAll(/className="([^"]+)"/g))for(const token of raw.split(/\s+/))names.add(token);
}
const basic={
  'mb-0':'margin-bottom:0',absolute:'position:absolute',relative:'position:relative',block:'display:block',flex:'display:flex',
  'flex-col':'flex-direction:column','flex-wrap':'flex-wrap:wrap','shrink-0':'flex-shrink:0',
  'content-stretch':'align-content:stretch','content-start':'align-content:flex-start',
  'items-center':'align-items:center','items-start':'align-items:flex-start','items-end':'align-items:flex-end','items-baseline':'align-items:baseline',
  'justify-center':'justify-content:center','justify-between':'justify-content:space-between','justify-end':'justify-content:flex-end',
  'self-stretch':'align-self:stretch','overflow-clip':'overflow:clip','w-full':'width:100%','h-full':'height:100%',
  'size-full':'width:100%;height:100%','max-w-none':'max-width:none','min-w-full':'min-width:100%',
  'min-w-px':'min-width:1px','min-h-px':'min-height:1px','h-px':'height:1px','gap-px':'gap:1px','gap-0':'gap:0',
  'inset-0':'inset:0','top-0':'top:0','left-0':'left:0','bg-white':'background-color:#fff',
  'text-white':'color:#fff','text-center':'text-align:center','uppercase':'text-transform:uppercase',
  'whitespace-nowrap':'white-space:nowrap','whitespace-pre':'white-space:pre',
  'font-normal':'font-weight:400','font-medium':'font-weight:500','font-semibold':'font-weight:600','font-bold':'font-weight:700','font-extrabold':'font-weight:800',
  'not-italic':'font-style:normal',border:'border-width:1px','border-b':'border-bottom-width:1px','border-b-2':'border-bottom-width:2px',
  'border-t':'border-top-width:1px','border-l':'border-left-width:1px','border-solid':'border-style:solid','border-dashed':'border-style:dashed',
};
const props={bg:'background-color',border:'border-color','border-l':'border-left-width','border-t':'border-top-width',
  flex:'flex',gap:'gap',h:'height',w:'width',inset:'inset',left:'left',top:'top',leading:'line-height',tracking:'letter-spacing',
  p:'padding',pt:'padding-top',pr:'padding-right',pb:'padding-bottom',pl:'padding-left',rounded:'border-radius',
  'rounded-tl':'border-top-left-radius','rounded-tr':'border-top-right-radius'};
function declaration(token){
  if(basic[token])return basic[token];
  if(token==='[word-break:break-word]')return 'overflow-wrap:break-word';
  const match=token.match(/^(.+)-\[(.*)\]$/);
  if(!match)throw new Error('Unconverted design class: '+token);
  const [,key,raw]=match;
  if(key==='font'){
    const family=raw.replaceAll("'",'').split(':')[0].replaceAll('_',' ');
    return `font-family:'${family}',${family.includes('Mono')?'monospace':'sans-serif'}`;
  }
  const value=raw.replaceAll('\\/','/').replaceAll('_',' ').replace(/var\(--[^,()]+,([^()]*)\)/g,'$1');
  if(key==='text')return value.startsWith('#')||value.startsWith('color:')?`color:${value.replace(/^color:/,'')}`:`font-size:${value}`;
  if(key==='size')return `width:${value};height:${value}`;
  if(key==='px')return `padding-left:${value};padding-right:${value}`;
  if(key==='py')return `padding-top:${value};padding-bottom:${value}`;
  if(!props[key])throw new Error('Unconverted design property: '+token);
  return `${props[key]}:${value.replace(/^color:/,'')}`;
}
const classes=new Map([...names].sort().map((token,i)=>[token,`d${i}`]));
fs.mkdirSync(path.join(root,'.build'),{recursive:true});
// Build the supplied design as static markup; the public page ships no React runtime.
await build({entryPoints:[path.join(root,'src/page.jsx')],outfile:path.join(root,'.build/page.cjs'),bundle:true,
  platform:'node',format:'cjs',jsx:'automatic',logLevel:'warning'});
const markup=require(path.join(root,'.build/page.cjs')).default;
await build({entryPoints:[path.join(root,'src/subpages.jsx')],outfile:path.join(root,'.build/subpages.cjs'),bundle:true,
  platform:'node',format:'cjs',jsx:'automatic',logLevel:'warning'});
const {pages,chrome,latest}=require(path.join(root,'.build/subpages.cjs')).default;
const dom=new JSDOM('<!doctype html><html lang="en"><head></head><body>'+markup+'</body></html>');
const document=dom.window.document;
for(const element of document.querySelectorAll('[class]'))element.className=element.className.split(/\s+/).map(c=>classes.get(c)||c).join(' ');
const release=latest.tagURL;
const download=latest.downloadURL;
const repo='https://github.com/tanzir71/intercept-releases';
const regionRoutes=[
 ['52:416',{'Overview':'#overview','Capabilities':'#capabilities','Input protection':'#features','Two modes':'#modes','AI agents':'#agents','Security':'#security','Requirements':'#requirements','FAQ':'#faq','Download':'./download.html'}],
 ['52:497',{'How attribution works':'./attribution.html'}],
 ['55:940',{'Read the input protection brief':'./input-protection.html'}],
 ['55:1292',{'How agent attribution works':'./attribution.html#agents'}],
 ['55:1708',{'See an example alert':'./alerts.html#example'}],
 ['55:1992',{'Tour Advanced mode':'./advanced-mode.html'}],
 ['57:286',{'Full coverage notes':'./coverage.html'}],
 ['57:381',{'Build from source':'./build.html'}],
 ['57:419',{'Read the documentation':'./docs.html'}],
 ['52:28',{'Download for Windows':'./download.html','Read the security brief':'./security.html'}],
 ['57:367',{'Download for Windows':'./download.html','Build from source':'./build.html'}],
];
function replaceWithLink(element,href){
  const next=document.createElement('a');
  for(const attr of element.attributes)next.setAttribute(attr.name,attr.value);
  next.href=href;
  while(element.firstChild)next.append(element.firstChild);
  element.replaceWith(next);return next;
}
// Website controls become keyboard-accessible links. The app previews remain
// labelled sample data rather than pretending to control the installed app.
const previewIds=['52:53','55:913','55:1264','55:1681','55:1964','56:166'];
for(const element of document.querySelectorAll('p')){
  if(element.closest('.showcase')||previewIds.some(id=>element.closest(`[data-node-id="${id}"]`)&&element.closest('[data-name^="App"]')))continue;
  const text=element.textContent.trim();
  const normalized=text.replace(/\s*→$/,'');
  const href=regionRoutes.find(([id,links])=>element.closest(`[data-node-id="${id}"]`)&&links[normalized])?.[1][normalized];
  if(!href)continue;
  const container=element.parentElement;
  if(container?.getAttribute('data-name')?.startsWith('Button/'))replaceWithLink(container,href);
  else replaceWithLink(element,href);
}
// One shared header, footer and closing CTA for the landing and every route.
const utility=document.querySelector('[data-node-id="52:4"]');if(utility)utility.outerHTML=chrome.header;
document.querySelector('[data-node-id="52:9"]')?.remove();
const footer=document.querySelector('[data-node-id="57:482"]');if(footer)footer.outerHTML=chrome.footer;
const closing=document.querySelector('[data-node-id="57:467"]');if(closing)closing.outerHTML=chrome.closing;
// D40: approved wording while the desktop implementation remains private.
for(const p of document.querySelectorAll('p')){
  if(p.childElementCount)continue;
  p.textContent=p.textContent.replaceAll('Free and open source','Free and MIT-licensed').replaceAll('Free, open source and local.','Free, MIT-licensed and local.').replaceAll('OPEN SOURCE, MIT','MIT-LICENSED');
}
// The original open answer is retained; closed rows receive explicit preview
// answers rather than an empty disclosure or a misleading protection claim.
const faqList=document.querySelector('[data-node-id="57:424"]');
const answers=[
  null,
  'Trusting an agent alone does not enable input exceptions. A current native calibration, a live computer-use session and an approved recipient are required. Protected apps remain excluded. See the current preview limitations before relying on this route.',
  'No. The native guard covers Windows-flagged keyboard and pointer input on the supported interactive desktop. It cannot promise coverage of virtual HID devices, browser DevTools input, UI Automation actions, other desktops or gaps after hook removal. Physical and real-agent calibration remain unproven in this preview.',
  'Intercept records metadata and does not retain key values or pointer coordinates. Its credential-path guardrails are intended to report access to sensitive locations without storing password or token contents. Preview behavior and optional enrichment are described in the security brief.',
  'The desktop app can run as a standard user. Some collection or elevated protection routes require separate permissions. This preview does not claim protection from an elevated attacker or from termination by the same user.',
  'This preview installer is unsigned and may be unfamiliar to Windows SmartScreen. Check the published SHA-256 before installation. A checksum verifies the downloaded bytes; it does not establish publisher signing or Windows reputation.',
  'No. Intercept is an independent project. Claude, Codex and Windows belong to their respective trademark owners.'
];
if(faqList){
  [...faqList.children].forEach((row,i)=>{
    const paragraphs=row.querySelectorAll('p');if(!paragraphs.length)return;
    const details=document.createElement('details');details.className='faq-item';details.open=i===0;
    const summary=document.createElement('summary');summary.textContent=paragraphs[0].textContent.trim();details.append(summary);
    const answer=document.createElement('p');answer.textContent=paragraphs[1]?.textContent.trim()||answers[i];
    if(!answer.textContent)throw new Error('Missing FAQ answer');details.append(answer);row.replaceWith(details);
  });
}
const notice=document.createElement('aside');notice.className='preview-note';notice.setAttribute('aria-label','Preview status');
notice.innerHTML=`<strong>Preview ${latest.preview} · ${new Date(latest.date+'T00:00:00Z').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'})}.</strong> This is a prerelease. Product screens show sample data; some designed features are still in development. <a href="./docs.html#preview-status">Current availability and limitations</a>.`;
document.querySelector('main').prepend(notice);
// A visible headline is semantic, and every major region is navigable.
const headline=document.querySelector('[data-node-id="52:31"]');if(headline){const h=document.createElement('h1');for(const a of headline.attributes)h.setAttribute(a.name,a.value);h.textContent=headline.textContent;headline.replaceWith(h);}
for(const section of document.querySelectorAll('main>section[id]'))section.setAttribute('aria-label',section.id.replaceAll('-',' '));
for(const img of document.querySelectorAll('img')){
  if(!img.getAttribute('src')?.startsWith('./assets/'))throw new Error('Nonlocal visual asset');
  if(!fs.statSync(path.join(root,img.getAttribute('src'))).size)throw new Error('Empty visual asset');
  img.setAttribute('decoding','async');
}
const css=fs.readFileSync(path.join(root,'src/site.css'),'utf8')+'\n'+[...classes].map(([token,cls])=>`.${cls}{${declaration(token)}}`).join('\n')+'\n'+fs.readFileSync(path.join(root,'src/responsive.css'),'utf8');
const cssVersion=createHash('sha256').update(css).digest('hex').slice(0,12);
document.head.innerHTML=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Intercept — Your privacy, in view</title>
<meta name="description" content="Local Windows activity monitoring and input protection. Download the Intercept preview, review its limitations, and keep your activity on your device.">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'">
<link rel="stylesheet" href="./site.css?v=${cssVersion}"><link rel="icon" href="./assets/favicon.svg" type="image/svg+xml"><script src="./site.js" defer></script>`;
document.body.insertAdjacentHTML('afterbegin','<a href="#overview" class="skip-link">Skip to content</a>');
fs.writeFileSync(path.join(root,'index.html'),dom.serialize());
for(const page of pages){
  const subdom=new JSDOM('<!doctype html><html lang="en"><head></head><body>'+page.markup+'</body></html>');
  const doc=subdom.window.document;
  doc.head.innerHTML=document.head.innerHTML;
  doc.title=page.title+' — Intercept';
  if(page.route==='download'){
    const refresh=doc.createElement('meta');refresh.httpEquiv='refresh';refresh.content='1;url='+download;doc.head.append(refresh);
  }
  for(const img of doc.images){
    if(!img.getAttribute('src')?.startsWith('./assets/')||!fs.statSync(path.join(root,img.getAttribute('src'))).size)throw new Error('Invalid page asset: '+page.route);
  }
  fs.writeFileSync(path.join(root,page.route+'.html'),subdom.serialize());
}
fs.writeFileSync(path.join(root,'site.css'),css);
console.log(JSON.stringify({sections:document.querySelectorAll('main>section').length,images:document.images.length,links:document.links.length,cssRules:classes.size,htmlBytes:fs.statSync(path.join(root,'index.html')).size}));
