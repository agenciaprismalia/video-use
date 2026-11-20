# Assemble <work>/build/video.html from the project sources + <work>/timeline.json + <work>/fonts/fonts.css
#   python assemble.py <work_dir>
import os, sys
W = sys.argv[1].rstrip('/') + '/'
B = os.path.dirname(os.path.abspath(__file__)) + '/build/'
h = open(B + 'template.html').read()
fonts = open(W + 'fonts/fonts.css').read().replace('url(', 'url(../fonts/')
h = h.replace('/*FONTS*/', fonts).replace('/*TL*/', open(W + 'timeline.json').read()).replace('/*LOGO*/', open(B + 'logo.svg').read())
h = h.replace('/*SCENES*/', open(B + 'scenes.js').read()).replace('/*BUILD*/', open(B + 'engine.js').read())
open(W + 'build/video.html', 'w').write(h)
print('ok', W + 'build/video.html')
