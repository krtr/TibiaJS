montage -mode concatenate -tile 64x -background #ff00ff spr/*.png out.png
convert out.png -gravity north -extent 2048x2048 out.png
convert out.png -transparent #ff00ff out.png
