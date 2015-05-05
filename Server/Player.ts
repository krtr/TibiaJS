
var startSprites = [56, 113, 223, 238];

class PlayerDataToSync {
	Position = { x: 60, y: 50 };
	StartSprite: number;
	ID: string;
}

class Player {
	private socket: SocketIO.Socket;
	private syncData = new PlayerDataToSync();

	constructor(socket: SocketIO.Socket) {
		this.socket = socket;
		this.syncData.ID = socket.id;
		this.syncData.StartSprite = startSprites[(Math.random() * 4) | 0];
	}

	Move(data: MoveData) {
		this.syncData.Position = data.Pos;
	}

	GetID(): string {
		return this.syncData.ID;
	}

	Sync() {
		this.socket.emit("PlayerStart", this.syncData);
	}

	GetSyncData(): PlayerDataToSync {
		return this.syncData;
	}
}


export = Player;