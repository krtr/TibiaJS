class Animation {

	Sprite = 0;
	AnimFrame = 0;
	spriteCount = 0;
	Position = { x: 0, y: 0 };
	Dead = false;
	constructor(sprite: number, spriteCount:number, pos: { x: number; y: number }) {
		this.Sprite = sprite;
		this.spriteCount = spriteCount;
		this.Position.x = pos.x;
		this.Position.y = pos.y;
	}

	Render() {
		if (!this.Dead) {
			DrawSprite(this.Sprite + this.AnimFrame, this.Position.x * config.TileSize, this.Position.y * config.TileSize);
		}
	}

	Update() {
		this.AnimFrame++;
		if (this.AnimFrame > this.spriteCount) {
			this.AnimFrame = 0;
			this.Dead = true;
		}
	}

}