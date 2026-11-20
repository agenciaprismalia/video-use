# Prepare Les Roquetes media into <work>/build/img (client assets stay outside the repo).
#   python prep_media.py <assets_dir> <work_dir>
# - One grade for every photo/aerial (instructions §3): moderate contrast, blues/cyans desaturated so
#   skies sit in the blue range, slight cool balance. Same chain on the Google Earth frames and on the
#   orthophotos so the flight -> orthophoto crossfade does not jump.
# - Report drawings: greyscale (they include red gálibo lines; red is not allowed), cropped to the
#   building (no outside dimensions/notes), small inner dimension figures blanked (only the
#   instructions' figures may appear on screen).
import os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw

A, W = sys.argv[1].rstrip('/') + '/', sys.argv[2].rstrip('/') + '/'
IMG = W + 'build/img/'
os.makedirs(IMG + 'fly', exist_ok=True)
GRADE = ('huesaturation=saturation=-0.38:colors=b+c:strength=1,'
         'eq=contrast=0.94:saturation=0.86:brightness=0.01,'
         'colorbalance=bs=0.035:bm=0.025:rh=-0.02')


def ff(src, dst, vf, extra=()):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, *extra, '-vf', vf, '-q:v', '2', dst], check=True)


# photos and orthophotos
ff(A + '02_sant-pere-de-ribes_panoramica_Stephenson_CC-BY-SA-3_0.jpg', IMG + 'spdr.jpg', GRADE)
ff(A + 'Barcelona__26732553335_.jpg', IMG + 'barcelona.jpg',
   GRADE.replace('saturation=-0.38', 'saturation=-0.48'))       # sky a bit lower still (§4 escena 2)
for n in ('03_les-roquetes_ortofoto_barrio_ICGC', '04_les-roquetes_ortofoto_parcela_ICGC'):
    src = A + n + ('.jpg' if os.path.exists(A + n + '.jpg') else '.png')
    ff(src, IMG + n.split('_')[0] + '_orto.jpg', GRADE)
# Google Earth flight: every frame, same grade (attribution untouched: no crop, no overlay)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', A + 'Amadeo_I_15_-_Fly-To.mp4', '-vf', GRADE, '-q:v', '3',
                '-start_number', '0', IMG + 'fly/f%03d.jpg'], check=True)

# drawings
def drawing(src, box, blanks, dst):
    im = Image.open(A + src).convert('L')
    d = ImageDraw.Draw(im)
    for b in blanks:
        d.rectangle(b, fill=255)
    im = im.crop(box)
    im.convert('RGB').save(IMG + dst, quality=95)
    return im.size

print('alzado', drawing('05_alzado-fachada-portada_informe.png', (98, 35, 590, 735), [], 'alzado.jpg'))
SEC_BLANKS = [(101, 136, 114, 151), (101, 183, 114, 206), (101, 248, 114, 263), (101, 300, 114, 323),
              (101, 364, 114, 379), (103, 426, 117, 449), (78, 443, 91, 466), (415, 433, 429, 451)]
print('seccion', drawing('03_seccion-viviendas_informe.jpg', (5, 135, 472, 590), SEC_BLANKS, 'seccion.jpg'))
print('fly frames', len(os.listdir(IMG + 'fly')))
