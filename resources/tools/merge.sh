
gm montage -background "#f0f" -mode concatenate -tile 128x128 $(ls sprites/*.png | sort -g) out.png

gm convert out.png -gravity north -background "#f0f" -extent 4096x4096 out.png
gm convert out.png -transparent "#f0f" out.png
#rm -rf ./sprites
