class Animation {

	Sprite = 0;
	AnimFrame = 0;
	spriteCount = 0;
	TilePosition = { x: 0, y: 0 };
	Dead = false;
	constructor(sprite: number, spriteCount:number, pos: { x: number; y: number }) {
		this.Sprite = sprite;
		this.spriteCount = spriteCount;
		this.TilePosition.x = pos.x;
		this.TilePosition.y = pos.y;
	}

	Render() {
		if (!this.Dead) {
			DrawSprite(this.Sprite + this.AnimFrame, this.TilePosition.x * config.TileSize, this.TilePosition.y * config.TileSize);
		}
	}

	Update() {
		this.AnimFrame++;
		if (this.AnimFrame >= this.spriteCount) {
			this.AnimFrame = 0;
			this.Dead = true;
		}
	}

}