import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
const B=process.argv[2]; const times=process.argv.slice(3).map(Number);
const br=await chromium.launch(); const pg=await br.newPage({viewport:{width:1920,height:1080}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await pg.goto('file://'+B+'/build/video.html'); await pg.evaluate(()=>document.fonts.ready);
if(errs.length)console.log('ERR',errs);
for(const t of times){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`${B}/verify/s_${t.toFixed(1)}.png`});}
console.log('ok',await pg.evaluate(()=>window.TOTAL));await br.close();
