import React from 'react';
import fs from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {SiteHeader,SiteFooter,ClosingCta,Breadcrumb,DocLayout,ProductHero,InPageNav,Callout,Pill,DataTable,CodeBlock,LinkCard,ProductImage,texts,words,repository} from './components.jsx';
import {latest,releases,releaseText} from './release.mjs';

const routes=['download','docs','security','input-protection','ai-agents','alerts','advanced-mode','attribution','coverage','build','releases','pricing','notices'];
const titles=['Download Intercept','Intercept documentation','Security brief','Input protection','AI agents','Alerts','Advanced mode tour','How attribution works','Coverage notes','Build from source','Release notes','Pricing','Third-party notices'];
const products=new Set(['input-protection','ai-agents','alerts','advanced-mode']);
const bespoke=new Set(['download','docs','pricing']);
const anchors={security:['at-a-glance','local-by-design','what-is-recorded','permissions','input-evidence','trusted-agents','locked-findings','verify','known-limits','report'],attribution:['overview','anatomy','identity','agents','confidence','limits'],coverage:['summary','input-routes','other-signals','guard-limits','agent-allowances','verification-status'],build:['before-you-start','prerequisites','desktop','checks','website','check-installer'],notices:['desktop-app','website','trademarks']};
const hrefs={
 'Download for Windows':'./download.html','Download':'./download.html','Download again':latest.downloadURL,
 'All releases on GitHub':repository+'/releases','Open GitHub Releases':repository+'/releases','GitHub Releases':repository+'/releases',
 'Release notes':'./releases.html','binary-provenance.json':'./binary-provenance.json',
 'Preview status in the documentation':'./docs.html#preview-status','Download and install':'./download.html','System requirements':'./#requirements',
 'Simple and Advanced mode':'./advanced-mode.html#compare','Input protection':'./input-protection.html','AI agents':'./ai-agents.html','Alerts':'./alerts.html','Advanced mode tour':'./advanced-mode.html',
 'Security brief':'./security.html','How attribution works':'./attribution.html','Coverage notes':'./coverage.html','Report a security issue':'./security.html#report','Build from source':'./build.html','Third-party notices':'./notices.html','Licence (MIT)':repository+'/blob/main/LICENSE','Read the licence':repository+'/blob/main/LICENSE',
 'Read the security brief':'./security.html','How agent attribution works':'./attribution.html#agents','Read how attribution works':'./attribution.html','Explore alerts':'./alerts.html','Read the Preview {{preview}} release notes':'./releases.html','Read the coverage notes':'./coverage.html','Report privately on GitHub':repository+'/security/advisories/new',
 'Explore AI agents':'./ai-agents.html','See an example alert':'#example','Compare the two modes':'#compare','Explore input protection':'./input-protection.html','Tour Advanced mode':'./advanced-mode.html','Read about input protection':'./input-protection.html',
 'View on GitHub':latest.tagURL,'Visit the public repository':repository,'Open the public repository':repository,'Read the documentation':'./docs.html','Read the release notes':'./releases.html',
 'Instrument Sans':'./licenses/INSTRUMENT-SANS-OFL.txt','Geist Mono':'./licenses/GEIST-MONO-OFL.txt','Inter':'./licenses/INTER-OFL.txt','Roboto Mono':'./licenses/ROBOTO-MONO-OFL.txt','Lucide icons':'./licenses/LUCIDE-LICENSE.txt',
};
const exact={};
const missing=new Set();
function hrefFor(n){const label=words(n);const href=exact[n.node]||hrefs[label];if(!href)missing.add(label+' ['+n.node+']');return href;}
function descendants(n,p){return p(n)?[n]:(n.children||[]).flatMap(c=>descendants(c,p))}
function find(n,p){return p(n)?n:(n.children||[]).map(c=>find(c,p)).find(Boolean)}
function cleanText(s){return releaseText(s)?.replaceAll('Free, open source and local.','Free, MIT-licensed and local.').replaceAll('independent open-source project','independent MIT-licensed project')}

// Content is the approved copy and layout, expressed as reusable semantic blocks.
function Content({node:n,hero=false,insideLink=false,schematic=false,depth=0}){
 if(!n)return null;
 const cls='content-block '+(n.kind==='row'?'layout-row':n.kind==='stack'||n.kind==='frame'?'layout-stack':'')+(n.style?.['--basis']?' sized-block':'');
 const props={style:n.style,'data-node-id':n.node,id:n.anchor};
 if(n.name?.startsWith('Marker '))return <span className="alert-marker" {...props} aria-hidden="true">{words(n)}</span>;
 if(n.node==='89:704')return <ol className="alert-legend" style={n.style}>{n.children.map((row,i)=><li key={row.node}><span className="alert-marker" aria-hidden="true">{i+1}</span><Content node={row.children.at(-1)}/></li>)}</ol>;
 if(n.node==='80:91')return <div className="sha-block layout-stack" data-copy-scope style={n.style}>{n.children.map(c=><Content key={c.node} node={c}/>)}</div>;
 if(n.text==='Copy')return <><button type="button" className="copy-button" data-copy hidden>Copy</button><span className="sr-only" data-copy-status aria-live="polite"/></>;
 const children=(n.children||[]).map((c,i)=><Content key={c.node||i} node={c} insideLink={insideLink} schematic={schematic||n.name==='Visual'} depth={depth+1}/>);
 switch(n.kind){
  case 'icon':return <img className="content-icon" {...props} src={n.src} width={n.size} height={n.size} alt="" aria-hidden="true"/>;
  case 'product-image':return <ProductImage node={n} alt="Intercept Advanced mode"/>;
  case 'spacer':return <div className="content-spacer" {...props} aria-hidden="true"/>;
  case 'divider':return <div className="content-divider" {...props} aria-hidden="true"/>;
  case 'dot':return <span className="content-dot" {...props} aria-hidden="true"/>;
  case 'heading':{const Tag=hero||n.hero?'h1':'h2';return <Tag className="content-heading" {...props}>{cleanText(n.text)}</Tag>}
  case 'subheading':return <h3 className="content-subheading" {...props}>{cleanText(n.text)}</h3>;
  case 'text':{const label=n.text?.trim();const license=hrefs[label];return <p className="content-text" {...props}>{!insideLink&&license&&n.node?.startsWith('95:')&&label!=='Copy'?<a href={license}>{cleanText(n.text)}</a>:cleanText(n.text)}</p>}
  case 'pill':return <Pill nodeId={n.node} style={n.style}>{children.length?children:cleanText(n.text)}</Pill>;
  case 'callout':return <Callout nodeId={n.node} style={n.style}>{children}</Callout>;
  case 'link-card':return <LinkCard nodeId={n.node} style={n.style}>{children}</LinkCard>;
  case 'table':return <DataTable node={n} render={c=><Content node={c}/>}/>;
  case 'code':{const rows=n.children||[];const label=rows[0]?.kind==='row'?words(rows[0]).replace(/Copy/g,'').trim():'';const content=label?rows.slice(1):rows;const line=content.find(c=>c.kind==='text');const lineHeight=n.style?.lineHeight||line?.style?.lineHeight;const gap=n.codeLayout?.lineGap||0;return <CodeBlock nodeId={n.node} style={n.style} layout={n.codeLayout} codeStyle={{fontSize:n.style?.fontSize||line?.style?.fontSize,lineHeight:gap?parseFloat(lineHeight)+gap+'px':lineHeight,marginBottom:gap?-gap:undefined}} label={cleanText(label)} code={cleanText(content.flatMap(texts).join('\n'))}/>}
  case 'link':{if(schematic)return <span className={cls+' schematic-control'} {...props}>{children}</span>;const href=hrefFor(n);return <a className={cls+' content-link'+(n.name?.startsWith('Button/')?' content-button':'')} {...props} href={href}>{(n.children||[]).map((c,i)=><Content key={c.node||i} node={c} insideLink/>)}{href?.startsWith('https://github.com')&&<span className="sr-only"> (opens GitHub)</span>}</a>}
  default:return <div className={cls+(n.name==='Section header'?' section-heading':'')+(n.name==='Visual'?' install-visual':'')+(n.name?.startsWith('Step ')?' install-step':'')} {...props}>{children}</div>;
 }
}
function withHero(n){find(n,x=>x.kind==='heading').hero=true;return function Hero({node}){return <Content node={node}/>}}
function articleSections(data,route){
 const sections=[];const intro=[];
 for(const node of data.children){
  if(node.kind==='heading'&&parseFloat(node.style?.fontSize)<40){sections.push({id:anchors[route]?.[sections.length],label:node.text,nodes:[]});}
  (sections.length?sections.at(-1).nodes:intro).push(node);
 }
 if(sections.some(s=>!s.id))throw new Error('Document anchor mapping: '+route);
 return {intro,sections};
}
function DocumentPage({data,route}){
 const {intro,sections}=articleSections(data,route);let firstHeading=true;
 return <DocLayout route={route} sections={sections}><div className="doc-intro">{intro.map((n,i)=>{const hero=n.kind==='heading'&&firstHeading;if(hero)firstHeading=false;return <Content key={n.node||i} node={n} hero={hero}/>})}</div>{sections.map(s=><section id={s.id} key={s.id} className="doc-section">{s.nodes.map((n,i)=><Content key={n.node||i} node={n}/>)}</section>)}</DocLayout>
}
function Markdown({text}){
 const inline=s=>s.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g).map((part,j)=>{
  const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(link){const href=link[2].replace('https://tanzir71.github.io/intercept-releases/','./');return <a key={j} href={href}>{link[1]}{href.startsWith('https://github.com')&&<span className="sr-only"> (opens GitHub)</span>}</a>}
  if(part.startsWith('`'))return <code key={j}>{part.slice(1,-1)}</code>;
  if(part.startsWith('**'))return <strong key={j}>{part.slice(2,-2)}</strong>;
  return part;
 });
 return text.split(/\r?\n\r?\n/).filter(Boolean).map((p,i)=>{
  // Installer facts are rendered once, from the canonical release config below.
  if(p.startsWith('# ')||p.startsWith('Installer:')||p.startsWith('The installer is unsigned. Its size is')||/^```\r?\n[a-f0-9]{64}\r?\n```$/.test(p))return null;
  if(p.startsWith('- '))return <ul key={i}>{p.split(/\r?\n/).map((s,j)=><li key={j}>{inline(s.replace(/^- /,''))}</li>)}</ul>;
  return <p key={i}>{inline(p)}</p>;
 });
}
function ReleasePage({data}){
 const intro=data.intro;let heading=true;
 const sections=releases.map(r=>({id:'v'+r.version.replaceAll('.','-'),label:r.version}));
 return <DocLayout route="releases" sections={sections}><div className="doc-intro">{intro.map((n,i)=>{const hero=heading&&n.kind==='heading';if(hero)heading=false;return <Content key={i} node={n} hero={hero}/>})}</div>{releases.map(r=><section className="release-entry doc-section" id={'v'+r.version.replaceAll('.','-')} key={r.version}><div className="release-heading"><h2>{r.version}</h2>{r===latest&&<span className="pill info">Latest</span>}<span className="pill caution">Prerelease</span></div><p className="release-date">{r.dateLabel} · Windows 11 x64</p><div className="markdown"><Markdown text={fs.readFileSync('releases/'+r.version+'.md','utf8')}/></div><div className="button-row"><ButtonLink href={r.downloadURL}>Download</ButtonLink><ButtonLink href={r.tagURL}>View on GitHub</ButtonLink></div><CodeBlock layout={data.checksumLayout} label={'SHA-256 · '+r.installer.bytes.toLocaleString('en-US')+' bytes'} code={r.installer.sha256}/></section>)}</DocLayout>
}
function ButtonLink({href,children}){return <a className="text-link" href={href}>{children} →{href.startsWith('https://github.com')&&<span className="sr-only"> (opens GitHub)</span>}</a>}
function ProductPage({data,route,title}){
 const Hero=withHero(data.hero);const navLabels=texts(data.nav).filter(t=>t!=='Download').slice(1);
 const sections=data.sections.map((s,i)=>({...s,label:navLabels[i]}));
 return <><ProductHero panel={data.panel} title={title}><Hero node={data.hero}/></ProductHero><InPageNav title={texts(data.nav)[0]} sections={sections}/>{sections.map((s,i)=>{
  const panel=s.tour?(s.panel||find(s.content,n=>n.kind==='product-image')?.node):undefined;
  const copy=s.tour?find(s.content,n=>n.kind==='stack'&&n.children?.some(c=>c.kind==='heading')):undefined;
  return <section className={'product-section'+(i%2?' alternate':'')+(s.tour?' tour-section':'')} id={s.id} key={s.id}>{s.tour?<div className={'site-container tour-row'+(i%2?' image-first':'')}><Content node={copy}/><ProductImage node={{node:panel,src:'./assets/subpages/panel-'+panel.replace(':','-')+'.webp',width:658,height:460}} alt={'Intercept '+s.label}/></div>:<Content node={s.content}/>}</section>
 })}<section className="related-section"><Content node={data.related}/></section><ClosingCta/></>
}
const bespokeAnchors={download:{'80:113':'install'},docs:{'83:117':'preview-status','83:219':'topics','83:332':'source','83:340':'updates','83:350':'privacy'},pricing:{'95:966':'plans','95:1082':'questions'}};
function BespokePage({data,route}){
 // Anchors are content nodes, so old deep links keep their precise destination.
 function set(n){const id=bespokeAnchors[route]?.[n.node];if(id)n.anchor=id;(n.children||[]).forEach(set)}set(data);
 const Hero=withHero(data.children[0]);
 return <div className={'bespoke-page '+route+'-page'}>{data.children.map((n,i)=><section className={'bespoke-section'+(n.style?.background==='#f1f4f9'?' alternate':'')} style={{background:n.style?.background}} key={n.node}>{i===0?<Hero node={n}/>:<Content node={n}/>}</section>)}</div>
}
const chrome={header:renderToStaticMarkup(<SiteHeader release={latest}/>),footer:renderToStaticMarkup(<SiteFooter/>),closing:renderToStaticMarkup(<ClosingCta/>)};
const pages=routes.map((route,i)=>{
 const data=JSON.parse(fs.readFileSync('src/content/'+route+'.json','utf8'));
 const active=route==='ai-agents'?'AI agents':products.has(route)?'Product':route==='download'?undefined:route==='pricing'?'Pricing':route==='security'?'Security':'Documentation';
 const content=products.has(route)?<ProductPage data={data} route={route} title={titles[i]}/>:bespoke.has(route)?<BespokePage data={data} route={route}/>:route==='releases'?<ReleasePage data={data}/>:<DocumentPage data={data} route={route}/>;
 return {route,title:titles[i],markup:renderToStaticMarkup(<><a className="skip-link" href="#content">Skip to content</a><SiteHeader active={active} release={latest}/>{!products.has(route)&&route!=='download'&&route!=='pricing'&&<Breadcrumb title={route==='docs'?'Documentation':titles[i]}/>}<main className="subpage" id={bespoke.has(route)||products.has(route)?'content':undefined}>{content}</main><SiteFooter/></>)};
});
if(missing.size)throw new Error('Unmapped destinations: '+[...missing].join('; '));
export default {pages,chrome,latest};

