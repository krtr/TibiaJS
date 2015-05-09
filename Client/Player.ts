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
		if (GameServices.IsKeyPressed(37) && !this.ground.GetCollision(this.TilePosion.x - 1, this.TilePosion.y)) {
			//super.MoveDir(Rotation.Left);
			this.network.SendMoveData({ Rot: Rotation.Left, Pos: this.TilePosion });
		}
		if (GameServices.IsKeyPressed(38) && !this.ground.GetCollision(this.TilePosion.x, this.TilePosion.y - 1)) {
			//super.MoveDir(Rotation.Top);
			this.network.SendMoveData({ Rot: Rotation.Top, Pos: this.TilePosion });
		}
		if (GameServices.IsKeyPressed(39) && !this.ground.GetCollision(this.TilePosion.x + 1, this.TilePosion.y)) {
			//super.MoveDir(Rotation.Right);
			this.network.SendMoveData({ Rot: Rotation.Right, Pos: this.TilePosion });
		}
		if (GameServices.IsKeyPressed(40) && !this.ground.GetCollision(this.TilePosion.x, this.TilePosion.y + 1)) {
			//super.MoveDir(Rotation.Down);
			this.network.SendMoveData({ Rot: Rotation.Down, Pos: this.TilePosion });
        }
	}
}