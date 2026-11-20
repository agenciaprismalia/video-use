# VHFS — Les Roquetes · vídeo de oportunidad de inversión (rama inmobiliaria)

Construido según «Les Roquetes · Instrucciones para el vídeo», con el sistema visual de Flamingo y la gama
de la rama inmobiliaria (azul pizarra + azul acento; sin gris azulado). Subtítulos en grafía oficial
(`vo/paras.json`); la voz lee `vo/guion_voz.txt`.

Los recursos del cliente (fotos, vuelo de Google Earth, ortofotos, planos del informe, música) **no están
en el repositorio**: se preparan en un directorio de trabajo.

```
python prep_media.py <assets> <work>        # etalonaje común, fotogramas del vuelo, planos en grises y recortados
TAKE=prov python build_vo.py <work>         # sin locución: tiempos orientativos del documento (§4)
TAKE=el python build_vo.py <work>           # con la toma: vo/el/take.mp3 + vo/el/take.stt.json (Scribe)
python assemble.py <work>                   # <work>/build/video.html (fuentes en <work>/fonts)
node build/render.mjs <work> 0 <frames> <work>/video.mp4
python mix_music.py <work> <música.mp3> <work>/video.mp4 <salida.mp4>
node build/export_srt.mjs <work> <salida.srt>
node build/audit.mjs <work> INSTRUCCIONES_VIDEO_LES_ROQUETES.md   # pie, subtítulos, colores, textos
```

Las escenas se sincronizan por palabra (`W(p,'palabra')`), así que al llegar la locución basta con
regenerar la línea de tiempos y volver a renderizar.
