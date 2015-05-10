class StaticSprite implements ICameraTarget {
	PixelPosition = { x: 0, y: 0 };
	TilePosion = { x: 0, y: 0 };
	Sprite = 0;

    Render(spriteDrawer: SpriteDrawer, FPS: number) {
		spriteDrawer.DrawSprite(this.Sprite, this.PixelPosition.x, this.PixelPosition.y);
	}

}