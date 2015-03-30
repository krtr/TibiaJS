class StaticSprite implements ICameraTarget {
	PixelPosition = { x: 0, y: 0 };
	TilePosion = { x: 0, y: 0 };
	Sprite = 0;

	Render() {
		DrawSprite(this.Sprite, this.PixelPosition.x, this.PixelPosition.y);
	}

}