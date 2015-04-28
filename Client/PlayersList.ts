class PlayersList implements OnTickListener {
	private list = new Array<Character>();
	thisPlayer: Player;

	SetCurrentPlayer(plr: Player) {
		this.list.push(plr);
		this.thisPlayer = plr;
	}

	SyncCurrentPlayer(data) {
		this.thisPlayer.Sync(data);
	}

	Add(data) {
		var char = new Mob(data.StartSprite);
		char.Sync(data);
		this.list.push(char);
	}

	Remove(ID: string) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].ID === ID) {
				this.list.splice(i, 1);
				break;
			}
		}
	}

	Render() {
		this.thisPlayer.CheckKeyPress();
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].Render();
		}
	}

	GetByID(ID: string): Character {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].ID === ID) {
				return this.list[i];
			}
		}
		return null;
	}

	OnTick() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].OnTick();
		}
	}
}