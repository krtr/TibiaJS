class ChatConsole implements IKeyboardListener {
	private chatInput: HTMLInputElement;
	private network: Network;
	constructor(network: Network) {
		this.network = network;
		this.chatInput = <HTMLInputElement>document.getElementById("ChatInput");
	}
	OnKeyDown(evt: KeyboardEvent) {
		if (evt.keyCode === 8) {
			if (this.chatInput.value.length > 0) {
				this.chatInput.value = this.chatInput.value.substr(0, this.chatInput.value.length - 1);
				return;
			}
		}
	}

	OnKeyPress(evt: KeyboardEvent) {

		var key = evt.keyCode || evt.which;
		if (key === 13) {
			this.network.SendChatMsg({ Msg: this.chatInput.value });
			this.chatInput.value = "";
			return;
		}
		if (key === 8) return;
		if (key > 36 && key < 41) return;
		this.chatInput.value += String.fromCharCode(key);
	}

	OnKeyUp(evt: KeyboardEvent) {}

}