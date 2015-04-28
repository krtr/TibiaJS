class ChatConsole implements IKeyboardListener {
	private chatInput: HTMLInputElement;
	constructor() {
		this.chatInput = <HTMLInputElement>document.getElementById("ChatInput");
	}
	OnKeyDown(evt: KeyboardEvent) {
		if (evt.keyCode === 8) {
			if (this.chatInput.value.length > 0) {
				this.chatInput.value = this.chatInput.value.substr(0, this.chatInput.value.length - 1);
			}
		}
	}

	OnKeyPress(evt: KeyboardEvent) {
		if (evt.keyCode === 13) {
			//TODO: some sending some displaying
			this.chatInput.value = "";
		}
		this.chatInput.value += String.fromCharCode(evt.charCode);
	}

	OnKeyUp(evt: KeyboardEvent) {}

}