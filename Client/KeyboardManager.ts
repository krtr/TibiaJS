class KeyboardManager {
	private static listenerList = new Array<IKeyboardListener>();
	public static keys = new Array<boolean>(200);

	static AddListener(listener: IKeyboardListener) {
		this.listenerList.push(listener);
	}

	static Start() {
		addEventListener("keydown", (keyEvent) => {
			keyEvent.preventDefault();
			if (KeyboardManager.keys[keyEvent.keyCode]) return;
			KeyboardManager.keys[keyEvent.keyCode] = true;
			//if (keyEvent.keyCode == 13) config.TileSize--;
			for (var i = 0; i < KeyboardManager.listenerList.length; i++) {
				KeyboardManager.listenerList[i].OnKeyPress(keyEvent);
			}
		});

		addEventListener("keyup", (keyEvent) => {
			KeyboardManager.keys[keyEvent.keyCode] = false;
			for (var i = 0; i < KeyboardManager.listenerList.length; i++) {
				KeyboardManager.listenerList[i].OnKeyRelease(keyEvent);
			}
		});
	}
}

interface IKeyboardListener {
	OnKeyPress(evt: KeyboardEvent);
	OnKeyRelease(evt: KeyboardEvent);
}
