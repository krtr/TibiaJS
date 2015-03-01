class Animation {

	Sprite = 0;
	AnimFrame = 0;
	Position = { x: 0, y: 0 };

	constructor(sprite: number, pos: { x: number; y: number }) {
		this.Sprite = sprite;
		this.Position.x = pos.x;
		this.Position.y = pos.y;
	}

	Render() {
		DrawSprite(this.Sprite + this.AnimFrame, this.Position.y * config.TileSize, this.Position.y * config.TileSize);
	}

}