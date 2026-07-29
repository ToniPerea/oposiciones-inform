#!/usr/bin/env bash
# Convierte clips grabados con el móvil en vídeos "dinámicos" listos para
# Instagram/TikTok/web: intro con logo, fondo difuminado para encajar en
# cualquier aspect ratio, marca de agua y outro con la URL.
#
# Uso: ./scripts/social-video.sh clip1.mov [clip2.mp4 ...]
# Salida: scripts/social-video-output/<nombre>_9x16.mp4 (+ _1x1, _16x9)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ $# -eq 0 ]]; then
  echo "Uso: $0 clip1.mov [clip2.mp4 ...]" >&2
  exit 1
fi

# shellcheck source=lib/social-video-common.sh
source "$SCRIPT_DIR/lib/social-video-common.sh"

for input in "$@"; do
  if [[ ! -f "$input" ]]; then
    echo "Aviso: '$input' no existe, se omite" >&2
    continue
  fi

  base="$(basename "${input%.*}")"
  echo "Procesando: $input"

  for fmt in "${FORMATS[@]}"; do
    IFS=':' read -r label w h <<< "$fmt"
    echo "  -> formato $label (${w}x${h})"

    tmp_intro="$CACHE_DIR/${base}_${label}_intro.mp4"
    tmp_main="$CACHE_DIR/${base}_${label}_main.mp4"
    tmp_outro="$CACHE_DIR/${base}_${label}_outro.mp4"
    final_out="$OUT_DIR/${base}_${label}.mp4"

    make_intro "$w" "$h" "$tmp_intro"
    make_main "$input" "$w" "$h" "$tmp_main"
    make_outro "$w" "$h" "$tmp_outro"
    concat_parts "$tmp_intro" "$tmp_main" "$tmp_outro" "$final_out"

    rm -f "$tmp_intro" "$tmp_main" "$tmp_outro"
  done

  echo "  Listo: $OUT_DIR/${base}_{9x16,1x1,16x9}.mp4"
done
