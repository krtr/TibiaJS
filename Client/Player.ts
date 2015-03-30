class Player extends Character {
	private ground: Ground;
	constructor(ground: Ground, startSprite:number) {
		super();
		this.Sprite = startSprite;
		this.ground = ground;
	}

	CheckKeyPress() {
		if (this.IsMoving) return;
		console.log(this.ground.GetCollision(this.TilePosion.x - 1, this.TilePosion.y));
		console.log(this.TilePosion);
		if (KeyboardManager.keys[37] && !this.ground.GetCollision(this.TilePosion.x - 1, this.TilePosion.y)) {
			super.Move(Rotation.Left);
		}
		if (KeyboardManager.keys[38] && !this.ground.GetCollision(this.TilePosion.x, this.TilePosion.y - 1)) {
			super.Move(Rotation.Top);
		}
		if (KeyboardManager.keys[39] && !this.ground.GetCollision(this.TilePosion.x + 1, this.TilePosion.y)) {
			super.Move(Rotation.Right);
		}
		if (KeyboardManager.keys[40] && !this.ground.GetCollision(this.TilePosion.x, this.TilePosion.y + 1)) {
			super.Move(Rotation.Down);
		}
	}
}