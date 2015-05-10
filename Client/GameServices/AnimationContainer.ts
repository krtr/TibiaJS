class AnimationContainer implements OnTickListener {
	private animationsList = new Array<Animation>();

	Add(sprite: { StartSprite: number; SpriteCount: number }, pos: { x: number; y: number }) {
		this.animationsList.push(new Animation(sprite.StartSprite, sprite.SpriteCount, pos));
	}

	OnTick() {
		for (var i = 0; i < this.animationsList.length; i++) {
			if (this.animationsList[i].Dead) {
				this.animationsList.splice(i, 1);
				i--;
				continue;
			}
			this.animationsList[i].Update();
		}
	}

    Render(spriteDrawer: SpriteDrawer, FPS: number) {
		for (var i = 0; i < this.animationsList.length; i++) {
            this.animationsList[i].Render(spriteDrawer, FPS);
		}
	}

}