import fs from 'node:fs';
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
const dom=new JSDOM('<!doctype html><html lang="en"><head></head><body>'+markup+'</body></html>');
const document=dom.window.document;
for(const element of document.querySelectorAll('[class]'))element.className=element.className.split(/\s+/).map(c=>classes.get(c)||c).join(' ');
const release='https://github.com/tanzir71/intercept-releases/releases/tag/v0.3.0-preview.11';
const download='https://github.com/tanzir71/intercept-releases/releases/download/v0.3.0-preview.11/Intercept-0.3.0-preview.11-x64-setup.exe';
const repo='https://github.com/tanzir71/intercept-releases';
const links=new Map([
  ['Download for Windows',download],['Download for Windows 11',download],['Read the security brief','./security.html'],
  ['Read the release notes →',release],['GitHub',repo],['Product','#overview'],['Overview','#overview'],
  ['AI agents','#agents'],['Security','#security'],['Documentation','./docs.html'],['Pricing','#pricing'],
  ['Capabilities','#capabilities'],['Input protection','#features'],['Two modes','#modes'],['Requirements','#requirements'],
  ['FAQ','#faq'],['Download',download],['Advanced mode','#modes'],['Alerts','#features'],['Read the documentation','./docs.html'],['Build from source','./docs.html#source'],['Licence (MIT)',repo+'/blob/main/LICENSE'],['Third-party notices','./notices.html'],['Report a security issue','./security.html#report'],['Security brief','./security.html'],['Release notes',release],['Source code',repo],['MIT license',repo+'/blob/main/LICENSE'],
]);
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
  const href=links.get(text);
  if(!href)continue;
  const container=element.parentElement;
  if(container?.getAttribute('data-name')?.startsWith('Button/'))replaceWithLink(container,href);
  else replaceWithLink(element,href);
}
const homepage=document.querySelector('[data-node-id="52:10"]');if(homepage)replaceWithLink(homepage,'#');
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
const pricing=document.createElement('span');pricing.id='pricing';document.querySelector('#requirements')?.prepend(pricing);
const notice=document.createElement('aside');notice.className='preview-note';notice.setAttribute('aria-label','Preview status');
notice.innerHTML='<strong>Preview 11 · November 18, 2026.</strong> This is a prerelease. Product screens show sample data; some designed features are still in development. <a href="./docs.html">Current availability and limitations</a>.';
document.querySelector('main').prepend(notice);
// A visible headline is semantic, and every major region is navigable.
const headline=document.querySelector('[data-node-id="52:31"]');if(headline){const h=document.createElement('h1');for(const a of headline.attributes)h.setAttribute(a.name,a.value);h.textContent=headline.textContent;headline.replaceWith(h);}
for(const section of document.querySelectorAll('main>section[id]'))section.setAttribute('aria-label',section.id.replaceAll('-',' '));
for(const img of document.querySelectorAll('img')){
  if(!img.getAttribute('src')?.startsWith('./assets/'))throw new Error('Nonlocal visual asset');
  if(!fs.statSync(path.join(root,img.getAttribute('src'))).size)throw new Error('Empty visual asset');
  img.setAttribute('decoding','async');
}
document.head.innerHTML=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Intercept — Your privacy, in view</title>
<meta name="description" content="Local Windows activity monitoring and input protection. Download the Intercept preview, review its limitations, and keep your activity on your device.">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'">
<link rel="stylesheet" href="./site.css"><link rel="icon" href="./assets/favicon.svg" type="image/svg+xml"><script src="./site.js" defer></script>`;
document.body.insertAdjacentHTML('afterbegin','<a href="#overview" class="skip-link">Skip to content</a>');
fs.writeFileSync(path.join(root,'index.html'),dom.serialize());
const css=fs.readFileSync(path.join(root,'src/site.css'),'utf8')+'\n'+[...classes].map(([token,cls])=>`.${cls}{${declaration(token)}}`).join('\n')+'\n'+fs.readFileSync(path.join(root,'src/responsive.css'),'utf8');
fs.writeFileSync(path.join(root,'site.css'),css);
console.log(JSON.stringify({sections:document.querySelectorAll('main>section').length,images:document.images.length,links:document.links.length,cssRules:classes.size,htmlBytes:fs.statSync(path.join(root,'index.html')).size}));
