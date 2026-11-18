import config from '../release-config.json' with {type:'json'};
import {repository} from './components.jsx';
export const releases=[...config.releases].sort((a,b)=>b.version.localeCompare(a.version,undefined,{numeric:true})).map(r=>({...r,preview:r.version.split('.').at(-1),tagURL:repository+'/releases/tag/v'+r.version,downloadURL:repository+'/releases/download/v'+r.version+'/'+r.installer.name,dateLabel:new Date(r.date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}));
export const latest=releases.find(r=>r.version===config.latest);
if(!latest)throw new Error('Latest release missing');
export function releaseText(value){
 const facts={version:latest.version,preview:latest.preview,installerName:latest.installer.name,dateLabel:latest.dateLabel,dateLong:new Date(latest.date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}),bytes:latest.installer.bytes.toLocaleString('en-US'),sizeLabel:(latest.installer.bytes/1e6).toFixed(1)+' MB ('+latest.installer.bytes.toLocaleString('en-US')+' bytes)',sha256:latest.installer.sha256,sha256Upper:latest.installer.sha256.toUpperCase(),sha256Short:latest.installer.sha256.slice(0,8).toUpperCase()+'…'+latest.installer.sha256.slice(-6).toUpperCase()};
 return value?.replace(/\{\{(\w+)\}\}/g,(_,key)=>{if(!(key in facts))throw new Error('Unknown release fact: '+key);return facts[key]});
}
