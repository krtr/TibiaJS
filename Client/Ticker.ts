interface OnTickListener {
	OnTick();
}

class Ticker {
	private static counter = 0;
	static ListenersList = new Array<{ obj: OnTickListener; interval: number }>();
	static Add(listner: OnTickListener, interval: number) {
		this.ListenersList.push({ obj: listner, interval: (interval/10)|0 });
	}

	static Start() {
		setInterval(() => {
			for (var i = 0; i < Ticker.ListenersList.length; i++) {
				if (Ticker.counter % Ticker.ListenersList[i].interval === 0) {
					Ticker.ListenersList[i].obj.OnTick();
				}
			}
			this.counter++;
		}, 10);
	}
}
