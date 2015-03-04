class AnimationContainer implements OnTickListener {
	Animations = new Array<Animation>();

	Add(sprite: { StartSprite: number; SpriteCount: number }, pos: { x: number; y: number }) {
		this.Animations.push(new Animation(sprite.StartSprite, sprite.SpriteCount, pos));
	}

	OnTick() {
		for (var i = 0; i < this.Animations.length; i++) {
			if (this.Animations[i].Dead) {
				this.Animations.splice(i, 1);
				i--;
				continue;
			}
			this.Animations[i].Update();
		}
	}

	Render() {
		for (var i = 0; i < this.Animations.length; i++) {
			this.Animations[i].Render();
		}
	}

}