# VHFS — Vídeo explicativo rama financiera (v1)

Vídeo animado 1920×1080 a 25 fps, de 2:12, generado a partir de HTML: cada escena se sincroniza con las palabras de la locución.

- `vo/paras.json` — guion de locución (sin «VHFS» pronunciado).
- Voz (v3): toma D (guion v7: dos modalidades, sin pignoraticia) de ElevenLabs generada por el cliente, con la voz `WJ4McWiTmSPVzxDpTF1x`. `build_vo_el.py` la corta en «…en nuestra web» y la sincroniza con las marcas de tiempo por palabra de Scribe (`vo/el/takeD.stt.json`).
- Voz anterior (v1-v2): Piper `es_ES-davefx-medium`, montada con `build_vo.py`.
- `build_vo.py` — monta `vo_master.wav` y `timeline.json` (palabras, segmentos y duración total).
- `build/scenes.js` — las 16 escenas. Cada animación se ancla a una palabra con `W(párrafo, 'palabra')`.
- `build/engine.js` — motor de render determinista: `render(t)`, subtítulos y transiciones.
- `build/render.mjs` — renderiza los fotogramas con Playwright y los pasa a ffmpeg.
- Música: «Moon Walk», Mixkit (licencia gratuita de Mixkit), con ducking por sidechain bajo la voz.

Las rutas de los scripts apuntan al directorio de trabajo de la sesión. Las fuentes Inter / Inter Tight se descargan de Google Fonts.
