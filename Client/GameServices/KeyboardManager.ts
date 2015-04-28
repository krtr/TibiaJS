class KeyboardManager {
	private listenerList = new Array<IKeyboardListener>();
	public keys = new Array<boolean>(200);

	AddListener(listener: IKeyboardListener) {
		this.listenerList.push(listener);
	}

	Start() {
		addEventListener("keydown", (keyEvent) => {
			
			if (this.keys[keyEvent.keyCode]) return;
			this.keys[keyEvent.keyCode] = true;
			//if (keyEvent.keyCode == 13) config.TileSize--;
			for (var i = 0; i < this.listenerList.length; i++) {
				this.listenerList[i].OnKeyDown(keyEvent);
			}
		});

		addEventListener("keyup", (keyEvent) => {
			this.keys[keyEvent.keyCode] = false;
			for (var i = 0; i < this.listenerList.length; i++) {
				this.listenerList[i].OnKeyUp(keyEvent);
			}
		});

		addEventListener("keypress",(keyEvent) => {
			keyEvent.preventDefault();
			for (var i = 0; i < this.listenerList.length; i++) {
				this.listenerList[i].OnKeyPress(keyEvent);
			}
		});
	}
}

interface IKeyboardListener {
	OnKeyDown(evt: KeyboardEvent);
	OnKeyPress(evt: KeyboardEvent);
	OnKeyUp(evt: KeyboardEvent);
}
