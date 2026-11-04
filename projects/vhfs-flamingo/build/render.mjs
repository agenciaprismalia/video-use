import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import {spawn} from 'child_process';
const [B,fromS,toS,out]=process.argv.slice(2); const FPS=25;
const br=await chromium.launch(); const pg=await br.newPage({viewport:{width:1920,height:1080}});
await pg.goto('file://'+B+'/build/video.html'); await pg.evaluate(()=>document.fonts.ready);
const f0=+fromS,f1=+toS;
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+FPS,'-c:v','png','-i','-','-c:v','libx264','-preset','medium','-crf','15','-pix_fmt','yuv420p','-tune','animation',out],{stdio:['pipe','inherit','inherit']});
for(let f=f0;f<f1;f++){await pg.evaluate(t=>render(t),f/FPS);const buf=await pg.screenshot({type:'png'});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();console.log('done',out);
