class Player extends AnimatedMovingSprite {

	constructor(startSprite:number) {
		super();
		this.Sprite = startSprite;
	}

	CheckKeyPress() {
		if (this.IsMoving) return;
		if (KeyboardManager.keys[37]) {
			super.Move(Rotation.Left);
		}
		if (KeyboardManager.keys[38]) {
			super.Move(Rotation.Top);
		}
		if (KeyboardManager.keys[39]) {
			super.Move(Rotation.Right);
		}
		if (KeyboardManager.keys[40]) {
			super.Move(Rotation.Down);
		}
	}
}