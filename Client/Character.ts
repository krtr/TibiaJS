///<reference path='staticSprite.ts' />
class Character extends StaticSprite implements OnTickListener {
	IsMoving = false;
	ID: string;
	private AnimPos = 1;
	private Rotation = Rotation.Top;
	private speed = 80.0;
	private targetPixelPos = { x: 0, y: 0 };
	private hp = 100;
	Render() {
		if (this.IsMoving) {
			var V = { x: this.targetPixelPos.x - this.PixelPosition.x, y: this.targetPixelPos.y - this.PixelPosition.y };
			var len = Math.sqrt(V.x * V.x + V.y * V.y);
			V.x /= len;
			V.y /= len;
			this.PixelPosition.x += V.x * this.speed / FPS;
			this.PixelPosition.y += V.y * this.speed / FPS;
			DrawSprite(this.Sprite + (this.Rotation * 3) + this.AnimPos, this.PixelPosition.x, this.PixelPosition.y);
			if (len < 2.0) {
				this.IsMoving = false;
				this.PixelPosition.x = this.targetPixelPos.x;
				this.PixelPosition.y = this.targetPixelPos.y;
			}
		} else {
			DrawSprite(this.Sprite + this.Rotation * 3, this.TilePosion.x * config.TileSize, this.TilePosion.y * config.TileSize);
		}

		DrawHealthBar(this.hp, this.PixelPosition.x, this.PixelPosition.y - 7);
	}

	Move(rot: Rotation) {
		if (rot === Rotation.Left) {
			this.TilePosion.x--;
		}
		if (rot === Rotation.Top) {
			this.TilePosion.y--;
		}
		if (rot === Rotation.Right) {
			this.TilePosion.x++;
		}
		if (rot === Rotation.Down) {
			this.TilePosion.y++;
		}
		this.IsMoving = true;
		this.Rotation = rot;
		this.targetPixelPos.x = this.TilePosion.x * config.TileSize;
		this.targetPixelPos.y = this.TilePosion.y * config.TileSize
	}

	Teleport(x: number, y: number) {
		GameServices.PutAnimation(config.Animations.Beam, this.TilePosion);
		this.TilePosion.x = x;
		this.TilePosion.y = y;
		this.PixelPosition.x = x * config.TileSize;
		this.PixelPosition.y = y * config.TileSize;
		this.targetPixelPos.x = this.PixelPosition.x;
		this.targetPixelPos.y = this.PixelPosition.y;
		GameServices.PutAnimation(config.Animations.Beam, this.TilePosion);
	}

	ShowMsg(str: string) {
		GameServices.PutText(str, { x: this.PixelPosition.x, y: this.PixelPosition.y - 30 });
	}

	Hit(hitpoints: number) {
		GameServices.PutMovingText(hitpoints.toString(), { x: this.PixelPosition.x, y: this.PixelPosition.y - 20 }, { x: 0, y: -20 });
		this.hp -= 10;
	}

	OnTick() {
		this.AnimPos++;
		if (this.AnimPos > 2) {
			this.AnimPos = 1;
		}
	}

	Sync(data) {
		this.Teleport(data.Position.x, data.Position.y);
		this.Sprite = data.StartSprite;
		this.ID = data.ID;
	}

}