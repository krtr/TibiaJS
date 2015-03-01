interface OnTickListener {
	OnTick();
}

class Ticker {
	static ListenersList = new Array<OnTickListener>();
	static Add(listner: OnTickListener) {
		this.ListenersList.push(listner);
	}

	static Start() {
		setInterval(() => {
			for (var i = 0; i < Ticker.ListenersList.length; i++) {
				Ticker.ListenersList[i].OnTick();
			}
		}, 150);
	}
}
