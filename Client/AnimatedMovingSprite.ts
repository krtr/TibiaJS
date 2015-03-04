///<reference path='staticSprite.ts' />
class AnimatedMovingSprite extends StaticSprite implements OnTickListener {
	IsMoving = false;
	private AnimPos = 1;
	private Rotation = Rotation.Top;
	private speed = 1.25;
	private targetPos = { x: 0, y: 0 };

	Render() {
		if (this.IsMoving) {
			var V = { x: this.targetPos.x - this.Position.x, y: this.targetPos.y - this.Position.y };
			var len = Math.sqrt(V.x * V.x + V.y * V.y);
			V.x /= len;
			V.y /= len;
			
			this.Position.x += V.x * this.speed;
			this.Position.y += V.y * this.speed;
			DrawSprite(this.Sprite + (this.Rotation * 3) + this.AnimPos, this.Position.x, this.Position.y);
			if (len < this.speed) {
				this.IsMoving = false;
				this.Position.x = this.targetPos.x;
				this.Position.y = this.targetPos.y;
			}
		} else {
			DrawSprite(this.Sprite + this.Rotation * 3, this.TilePosion.x * config.TileSize, this.TilePosion.y * config.TileSize);
		}

		DrawHealthBar(100, this.Position.x, this.Position.y + 7);
	}

	Move(rot: Rotation) {
		if (rot === Rotation.Left) {
			this.TilePosion.x--;
		}
		if (rot === Rotation.Top) {
			this.TilePosion.y++;
		}
		if (rot === Rotation.Right) {
			this.TilePosion.x++;
		}
		if (rot === Rotation.Down) {
			this.TilePosion.y--;
		}
		this.IsMoving = true;
		this.Rotation = rot;
		this.targetPos.x = this.TilePosion.x * config.TileSize;
		this.targetPos.y = this.TilePosion.y * config.TileSize
	}

	OnTick() {
		this.AnimPos++;
		if (this.AnimPos > 2) {
			this.AnimPos = 1;
		}
	}

}