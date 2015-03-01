class StaticSprite implements ICameraTarget {
	Position = { x: 0, y: 0 };
	TilePosion = { x: 0, y: 0 };
	Sprite = 0;

	Render() {
		DrawSprite(this.Sprite, this.Position.x, this.Position.y);
	}

}