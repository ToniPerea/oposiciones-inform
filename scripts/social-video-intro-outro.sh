#!/usr/bin/env bash
# Genera solo el intro y el outro animados (sin clip principal), en los
# 3 formatos de salida, para usarlos sueltos (p.ej. como plantilla en un
# editor de vídeo o para reutilizarlos en otros montajes).
#
# Uso: ./scripts/social-video-intro-outro.sh
# Salida: scripts/social-video-output/intro_9x16.mp4, outro_9x16.mp4 (+ _1x1, _16x9)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# shellcheck source=lib/social-video-common.sh
source "$SCRIPT_DIR/lib/social-video-common.sh"

for fmt in "${FORMATS[@]}"; do
  IFS=':' read -r label w h <<< "$fmt"
  echo "-> formato $label (${w}x${h})"

  make_intro "$w" "$h" "$OUT_DIR/intro_${label}.mp4"
  make_outro "$w" "$h" "$OUT_DIR/outro_${label}.mp4"
done

echo "Listo: $OUT_DIR/{intro,outro}_{9x16,1x1,16x9}.mp4"
