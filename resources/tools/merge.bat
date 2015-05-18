montage -mode concatenate -tile 32x -background #ff00ff  *.png out.png
convert out.png -gravity north -extent 512x512 out.png
convert out.png -transparent #ff00ff out.png
