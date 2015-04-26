class Player extends Character {
	private ground: Ground;
	private network: Network;
	constructor(ground: Ground, network:Network, startSprite:number) {
		super();
		this.Sprite = startSprite;
		this.ground = ground;
		this.network = network;
	}


	CheckKeyPress() {
		if (this.IsMoving) return;
		if (KeyboardManager.keys[37] && !this.ground.GetCollision(this.TilePosion.x - 1, this.TilePosion.y)) {
			super.Move(Rotation.Left);
			this.network.socket.emit("PlayerMove", { Rot: Rotation.Left, Pos: this.TilePosion });
		}
		if (KeyboardManager.keys[38] && !this.ground.GetCollision(this.TilePosion.x, this.TilePosion.y - 1)) {
			super.Move(Rotation.Top);
			this.network.socket.emit("PlayerMove", { Rot: Rotation.Top, Pos: this.TilePosion });
		}
		if (KeyboardManager.keys[39] && !this.ground.GetCollision(this.TilePosion.x + 1, this.TilePosion.y)) {
			super.Move(Rotation.Right);
			this.network.socket.emit("PlayerMove", { Rot: Rotation.Right, Pos: this.TilePosion });
		}
		if (KeyboardManager.keys[40] && !this.ground.GetCollision(this.TilePosion.x, this.TilePosion.y + 1)) {
			super.Move(Rotation.Down);
			this.network.socket.emit("PlayerMove", { Rot: Rotation.Down, Pos: this.TilePosion });
		}
	}
}