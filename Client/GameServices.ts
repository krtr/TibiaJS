///<reference path='./GameServices/AnimationContainer.ts' />
///<reference path='./GameServices/ticker.ts' />
///<reference path='./GameServices/keyboardManager.ts' />
///<reference path='./GameServices/TextDisplayer.ts' />
module GameServices {
	export function InitServices() {
		ticker.Start();
		keyboardManager.Start();
		ticker.Add(animationContainer, 50);
	}

	export function PutAnimation(sprite: { StartSprite: number; SpriteCount: number }, pos: Vector2D) {
		animationContainer.Add(sprite, pos);
	}

	export function PutText(str: string, pos: Vector2D) {
		textDisplayer.AddTxt(str, "#FFFFFF", pos);
	}

	export function AddTickListener(listener: OnTickListener, interval: number) {
		ticker.Add(listener, interval);
	}

	export function AddKeyboardListener(listener: IKeyboardListener) {
		keyboardManager.AddListener(listener);
	}

	export function IsKeyPressed(keyCode: number): boolean {
		return keyboardManager.keys[keyCode];
	}

	export function ProcessServces() {
		animationContainer.Render();
		textDisplayer.Render();
	}

	var animationContainer = new AnimationContainer();
	var keyboardManager = new KeyboardManager();
	var ticker = new Ticker();
	var textDisplayer = new TextDisplayer();
} 