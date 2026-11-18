function resizePreviews(){
  const hero=document.querySelector('[data-node-id="55:14"]');
  if(hero)hero.style.setProperty('--hero-scale',String(Math.min(1,(hero.clientWidth-(innerWidth<=800?32:120))/1080)));
  const stage=document.querySelector('.product-stage');
  if(stage)stage.style.setProperty('--stage-scale',String(Math.min(1,(stage.clientWidth-32)/1104)));
}
resizePreviews();addEventListener('resize',resizePreviews,{passive:true});

for(const button of document.querySelectorAll('[data-copy]')){
 if(!navigator.clipboard?.writeText)continue;
 button.hidden=false;
 button.addEventListener('click',async()=>{
  const scope=button.closest('.code-block,[data-copy-scope]');
  const value=scope?.querySelector('code')?.textContent||scope?.querySelector('[data-node-id="80:100"]')?.textContent;
  if(!value)return;
  const status=scope.querySelector('[data-copy-status]');
  try{await navigator.clipboard.writeText(value);if(status)status.textContent='Copied';}
  catch{if(status)status.textContent='Copy unavailable. Select the text to copy it.';}
 });
}
if('IntersectionObserver' in window){
 for(const navigation of document.querySelectorAll('[data-scrollspy]')){
  const links=[...navigation.querySelectorAll('a[href^="#"]')];
  const pairs=links.map(link=>[document.getElementById(link.hash.slice(1)),link]).filter(([target])=>target);
  const visible=new Set();
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries)entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target);
   const current=pairs.find(([target])=>visible.has(target));
   for(const [,link] of pairs)link.removeAttribute('aria-current');
   if(current)current[1].setAttribute('aria-current','location');
  },{rootMargin:'-100px 0px -45% 0px',threshold:0});
  for(const [target] of pairs)observer.observe(target);
 }
}
