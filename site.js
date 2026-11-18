function resizePreviews(){
  const hero=document.querySelector('[data-node-id="55:14"]');
  if(hero)hero.style.setProperty('--hero-scale',String(Math.min(1,(hero.clientWidth-(innerWidth<=800?32:120))/1080)));
  const stage=document.querySelector('.product-stage');
  if(stage)stage.style.setProperty('--stage-scale',String(Math.min(1,(stage.clientWidth-32)/1104)));
}
resizePreviews();addEventListener('resize',resizePreviews,{passive:true});
