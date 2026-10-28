import json,re
B='/tmp/claude-0/-home-user-video-use/75d14596-cf69-57f6-b09c-3e5adc4db6d4/scratchpad/filicor/'
h=open(B+'build/template.html').read()
fonts=open(B+'fonts/fonts.css').read().replace("url(","url(../fonts/")
h=h.replace('/*FONTS*/',fonts).replace('/*TL*/',open(B+'timeline.json').read()).replace('/*LOGO*/',open(B+'build/logo.svg').read())
sc=open(B+'build/scenes.js').read()
h=h.replace('/*SCENES*/',sc).replace('/*BUILD*/',open(B+'build/engine.js').read())
import base64
h=h.replace('/*GOB*/','data:image/png;base64,'+base64.b64encode(open(B+'build/gobierno.png','rb').read()).decode())
open(B+'build/video.html','w').write(h)
