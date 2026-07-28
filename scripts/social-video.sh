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

LOGO_ICON="$REPO_ROOT/public/logo-alt.png"   # solo icono, para la marca de agua del clip principal
ASSETS_DIR="$SCRIPT_DIR/assets"
ICON_BLUE="$ASSETS_DIR/icon-layer-blue-transparent.png"   # libro (capa 1 de la animación de formación)
ICON_ORANGE="$ASSETS_DIR/icon-layer-orange-transparent.png" # cinta + balón (capa 2)
WORDMARK="$ASSETS_DIR/wordmark-transparent.png"           # texto "EDUCOEF"
URL_BADGE="$ASSETS_DIR/educoef-url.png"                   # texto "educoef.com"
SHINE="$ASSETS_DIR/shine.png"                             # destello diagonal para el reveal
BLOB_BLUE="$ASSETS_DIR/blob-blue.png"                     # manchas de color del fondo animado
BLOB_ORANGE="$ASSETS_DIR/blob-orange.png"
CACHE_DIR="$SCRIPT_DIR/.cache"
OUT_DIR="$SCRIPT_DIR/social-video-output"

INTRO_DURATION=2.8
OUTRO_DURATION=2.3
FADE_DURATION=0.4

if [[ $# -eq 0 ]]; then
  echo "Uso: $0 clip1.mov [clip2.mp4 ...]" >&2
  exit 1
fi

for bin in ffmpeg ffprobe; do
  if ! command -v "$bin" >/dev/null 2>&1; then
    echo "Error: se necesita '$bin' instalado (brew install ffmpeg)" >&2
    exit 1
  fi
done

mkdir -p "$CACHE_DIR" "$OUT_DIR"

# Icono con el fondo blanco eliminado (una sola vez, cacheado)
ICON_TRANSPARENT="$CACHE_DIR/logo-icon-transparent.png"
if [[ ! -f "$ICON_TRANSPARENT" ]]; then
  ffmpeg -y -loglevel error -i "$LOGO_ICON" \
    -vf "colorkey=white:0.12:0.08" \
    "$ICON_TRANSPARENT"
fi

# formato: nombre:ancho:alto
FORMATS=(
  "9x16:1080:1920"
  "1x1:1080:1080"
  "16x9:1920:1080"
)

# Las posiciones/tamaños del icono+wordmark están en píxeles fijos porque los
# 3 formatos de salida comparten siempre la misma dimensión menor (1080), y
# el centrado usa W/H (resueltos por ffmpeg en tiempo de ejecución) para
# adaptarse al ancho/alto real de cada formato sin recalcular nada aquí.
make_intro() {
  local w=$1 h=$2 out=$3
  local fade_out_st
  fade_out_st="$(LC_NUMERIC=C awk -v a="$INTRO_DURATION" -v b="$FADE_DURATION" 'BEGIN{print a-b}')"
  ffmpeg -y -loglevel error \
    -f lavfi -i "gradients=s=${w}x${h}:c0=0xEFF6FF:c1=0xFFFFFF:c2=0xFFF7ED:n=3:speed=0.015:d=${INTRO_DURATION}:r=30" \
    -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=44100" \
    -loop 1 -i "$BLOB_BLUE" \
    -loop 1 -i "$BLOB_ORANGE" \
    -loop 1 -i "$ICON_BLUE" \
    -loop 1 -i "$ICON_ORANGE" \
    -loop 1 -i "$SHINE" \
    -loop 1 -i "$WORDMARK" \
    -filter_complex "
      [2:v]scale=900:-1[b1];
      [3:v]scale=750:-1[b2];
      [0:v][b1]overlay=x=-200:y=-250[t1];
      [t1][b2]overlay=x=W-500:y=H-700[bg];
      [4:v]format=rgba,scale=w='560*(0.75+0.25*min(max((t-0.1)/0.5\,0)\,1))':h=-1:eval=frame,fade=t=in:st=0.1:d=0.5:alpha=1[book];
      [5:v]format=rgba,scale=w=560:h=-1,fade=t=in:st=0.5:d=0.5:alpha=1[ribbon];
      [6:v]format=rgba,scale=500:-1,colorchannelmixer=aa=0.55[shine];
      [7:v]format=rgba,scale=380:-1,fade=t=in:st=1.1:d=0.5:alpha=1[word];
      [bg][book]overlay=x='(W-w)/2':y='(H-586)/2'[s1];
      [s1][ribbon]overlay=x='(W-w)/2+260*(1-min(max((t-0.5)/0.5\,0)\,1))':y='(H-586)/2-200*(1-min(max((t-0.5)/0.5\,0)\,1))'[s2];
      [s2][shine]overlay=x='-600+(W+1200)*min(max((t-0.95)/0.55\,0)\,1)':y='(H-1038)/2'[s3];
      [s3][word]overlay=x='(W-w)/2':y='(H-586)/2+453+40*(1-min(max((t-1.1)/0.5\,0)\,1))'[s4];
      [s4]fade=t=in:st=0:d=${FADE_DURATION}:alpha=0,fade=t=out:st=${fade_out_st}:d=${FADE_DURATION}:alpha=0
      [vout]
    " \
    -map "[vout]" -map 1:a -t "$INTRO_DURATION" \
    -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest \
    "$out"
}

make_outro() {
  local w=$1 h=$2 out=$3
  local fade_out_st
  fade_out_st="$(LC_NUMERIC=C awk -v a="$OUTRO_DURATION" -v b="$FADE_DURATION" 'BEGIN{print a-b}')"
  ffmpeg -y -loglevel error \
    -f lavfi -i "gradients=s=${w}x${h}:c0=0xFFF7ED:c1=0xFFFFFF:c2=0xEFF6FF:n=3:speed=0.015:d=${OUTRO_DURATION}:r=30" \
    -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=44100" \
    -loop 1 -i "$BLOB_ORANGE" \
    -loop 1 -i "$BLOB_BLUE" \
    -loop 1 -i "$ICON_BLUE" \
    -loop 1 -i "$ICON_ORANGE" \
    -loop 1 -i "$SHINE" \
    -loop 1 -i "$WORDMARK" \
    -loop 1 -i "$URL_BADGE" \
    -filter_complex "
      [2:v]scale=900:-1[b1];
      [3:v]scale=750:-1[b2];
      [0:v][b1]overlay=x=W-700:y=-250[t1];
      [t1][b2]overlay=x=-300:y=H-700[bg];
      [4:v]format=rgba,scale=w='560*(0.8+0.2*min(max((t-0.1)/0.5\,0)\,1))':h=-1:eval=frame,fade=t=in:st=0.1:d=0.5:alpha=1[book];
      [5:v]format=rgba,scale=w='560*(0.8+0.2*min(max((t-0.1)/0.5\,0)\,1))':h=-1:eval=frame,fade=t=in:st=0.1:d=0.5:alpha=1[ribbon];
      [6:v]format=rgba,scale=500:-1,colorchannelmixer=aa=0.55[shine];
      [7:v]format=rgba,scale=w='380*(0.8+0.2*min(max((t-0.1)/0.5\,0)\,1))':h=-1:eval=frame,fade=t=in:st=0.1:d=0.5:alpha=1[word];
      [8:v]format=rgba,scale=350:-1,fade=t=in:st=0.75:d=0.5:alpha=1[url];
      [bg][book]overlay=x='(W-w)/2':y='(H-586)/2'[s1];
      [s1][ribbon]overlay=x='(W-w)/2':y='(H-586)/2'[s2];
      [s2][shine]overlay=x='-600+(W+1200)*min(max((t-0.5)/0.55\,0)\,1)':y='(H-1038)/2'[s3];
      [s3][word]overlay=x='(W-w)/2':y='(H-586)/2+453'[s4];
      [s4][url]overlay=x='(W-w)/2':y='(H-586)/2+453+180+30*(1-min(max((t-0.75)/0.5\,0)\,1))'[s5];
      [s5]fade=t=in:st=0:d=${FADE_DURATION}:alpha=0,fade=t=out:st=${fade_out_st}:d=${FADE_DURATION}:alpha=0
      [vout]
    " \
    -map "[vout]" -map 1:a -t "$OUTRO_DURATION" \
    -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest \
    "$out"
}

make_main() {
  local input=$1 w=$2 h=$3 out=$4
  # Fondo difuminado (ampliado+blur) + copia nítida centrada sin recortar
  # + marca de agua del icono en la esquina inferior derecha.
  # fps y audio se normalizan a 30fps / aac 44100 estéreo para que el
  # concat demuxer (-c copy) pueda unir intro+main+outro sin sorpresas.
  local has_audio
  has_audio="$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$input" | head -1)"

  local audio_input=()
  local audio_map icon_idx
  if [[ -n "$has_audio" ]]; then
    audio_map="0:a"
    icon_idx=1
  else
    audio_input=(-f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=44100")
    audio_map="1:a"
    icon_idx=2
  fi

  ffmpeg -y -loglevel error -i "$input" ${audio_input[@]+"${audio_input[@]}"} -i "$ICON_TRANSPARENT" \
    -filter_complex "
      [0:v]fps=30,scale=${w}:${h}:force_original_aspect_ratio=increase,
      crop=${w}:${h},gblur=sigma=25[bg];
      [0:v]fps=30,scale=${w}:${h}:force_original_aspect_ratio=decrease[fg];
      [bg][fg]overlay=(W-w)/2:(H-h)/2[base];
      [${icon_idx}:v]scale=${w}*0.14:-1,format=rgba,colorchannelmixer=aa=0.85[wm];
      [base][wm]overlay=W-w-${w}*0.03:H-h-${h}*0.03
      [vout]
    " \
    -map "[vout]" -map "${audio_map}" -shortest \
    -c:v libx264 -pix_fmt yuv420p -c:a aac -ar 44100 -ac 2 \
    "$out"
}

concat_parts() {
  local intro=$1 main=$2 outro=$3 out=$4
  local list_file
  list_file="$(mktemp)"
  printf "file '%s'\nfile '%s'\nfile '%s'\n" "$intro" "$main" "$outro" > "$list_file"
  ffmpeg -y -loglevel error -f concat -safe 0 -i "$list_file" -c copy "$out"
  rm -f "$list_file"
}

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
