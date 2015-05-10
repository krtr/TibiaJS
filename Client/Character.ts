///<reference path='staticSprite.ts' />

class Character extends StaticSprite implements OnTickListener {
	IsMoving = false;
	ID: string;
	private AnimPos = 1;
	private Rotation = Rotation.Top;
	private speed = 80.0;
	private targetPixelPos = { x: 0, y: 0 };
	private hp = 100;
    Render(spriteDrawer: SpriteDrawer, FPS: number) {
		if (this.IsMoving) {
			var V = { x: this.targetPixelPos.x - this.PixelPosition.x, y: this.targetPixelPos.y - this.PixelPosition.y };
			var len = Math.sqrt(V.x * V.x + V.y * V.y);
			V.x /= len;
			V.y /= len;
			this.PixelPosition.x += V.x * this.speed / FPS;
			this.PixelPosition.y += V.y * this.speed / FPS;
            spriteDrawer.DrawSprite(this.Sprite + (this.Rotation * 3) + this.AnimPos, this.PixelPosition.x - 10, this.PixelPosition.y - 10);
			if (len < 2.0) {
				this.IsMoving = false;
				this.PixelPosition.x = this.targetPixelPos.x;
				this.PixelPosition.y = this.targetPixelPos.y;
			}
		} else {
            spriteDrawer.DrawSprite(this.Sprite + this.Rotation * 3, this.TilePosion.x * config.TileSize - 10, this.TilePosion.y * config.TileSize - 10);
		}

        spriteDrawer.DrawHealthBar(this.hp, this.PixelPosition.x - 10 , this.PixelPosition.y - 7 - 10);
	}

    MoveDir(rot: Rotation) {
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

    Move(data: MoveData) {
      
        if ((data.Pos.x !== this.TilePosion.x) || (data.Pos.y !== this.TilePosion.y)) {
            console.log(this.TilePosion, data.Pos);
            this.Teleport(data.Pos);
        }
        this.MoveDir(data.Rot);
    }


    Teleport(newPos: Vector2D) {
		GameServices.PutAnimation(config.Animations.Beam, this.TilePosion);
		this.TilePosion.x = newPos.x;
        this.TilePosion.y = newPos.y;
        this.PixelPosition.x = newPos.x * config.TileSize;
        this.PixelPosition.y = newPos.y * config.TileSize;
		this.targetPixelPos.x = this.PixelPosition.x;
		this.targetPixelPos.y = this.PixelPosition.y;
		GameServices.PutAnimation(config.Animations.Beam, this.TilePosion);
	}

	ShowMsg(str: string) {
		GameServices.PutText(str, { x: this.PixelPosition.x, y: this.PixelPosition.y - 30 });
	}

	Hit(hitpoints: number) {
		GameServices.PutMovingText(hitpoints.toString(), { x: this.PixelPosition.x - 10, y: this.PixelPosition.y - 20 - 10 }, { x: 0, y: -20 });
		this.hp -= 10;
	}

	OnTick() {
		this.AnimPos++;
		if (this.AnimPos > 2) {
			this.AnimPos = 1;
		}
	}

    Sync(data) {
        console.log(data);
		this.Teleport(data.Position);
		this.Sprite = data.StartSprite;
		this.ID = data.ID;
	}

}