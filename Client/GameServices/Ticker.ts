interface OnTickListener {
	OnTick();
}

class Ticker {
	private counter = 0;
	private ListenersList = new Array<{ obj: OnTickListener; interval: number }>();
	Add(listner: OnTickListener, interval: number) {
		this.ListenersList.push({ obj: listner, interval: (interval/10)|0 });
	}

	Start() {
		setInterval(() => {
			for (var i = 0; i < this.ListenersList.length; i++) {
				if (this.counter % this.ListenersList[i].interval === 0) {
					this.ListenersList[i].obj.OnTick();
				}
			}
			this.counter++;
		}, 10);
	}
}
