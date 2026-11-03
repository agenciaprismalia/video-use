# VHFS — Filicor 3 · vídeo de presentación de operación (guion v2)

Pieza hermana de `projects/vhfs-rama-financiera` y con el mismo motor: escenas HTML sincronizadas palabra a palabra con la locución.

- `vo/paras.json`: guion de locución en 12 párrafos, literal del guion v2 del cliente (empresa primero, después la operación).
- `build/scenes.js`: escenas de apertura, operación, condiciones, calendario de pagos, empresa, empresa en cifras, facturación, garantía, riesgos y cierre.
- Subtítulos activados sobre una franja clara inferior, como pide el brief.
- La previsualización usa una voz provisional (Piper `es_ES-davefx-medium`, montada con `build_vo_piper.py`). La versión final se resincroniza con la toma de ElevenLabs del cliente.
