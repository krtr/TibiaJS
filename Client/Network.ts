class Network {

	private socket: SocketIOClient.Socket;
	playerList: CharacterList;
	constructor(playerList: CharacterList) {
		this.playerList = playerList;
	}

	Connect() {
		this.socket = io.connect();
		console.log("Connection");
		this.SetupConn();
	}


	SendMoveData(data: MoveData) {
		this.socket.emit("CharacterMove", data);
	}

	SendChatMsg(data) {
		this.socket.emit("CharacterMessage", data);
	}

	private SetupConn() {

		this.socket.on("PlayerStart",(data) => {
			console.log(JSON.stringify(data));
			this.playerList.SyncCurrentPlayer(data);
		});

		this.socket.on("CharacterMove",(data: { ID: string; Data: MoveData }) => {
			var plr = this.playerList.GetByID(data.ID);
			if (plr) {
				plr.Move(data.Data.Rot);
			}
		});

		this.socket.on("CharacterNew",(data) => {
			this.playerList.Add(data);
			this.playerList.GetByID(data.ID).Hit(25);
		});

		this.socket.on("CharacterHit",(data) => {
			this.playerList.GetByID(data.ID).Hit(data.Dmg);
		});

		this.socket.on("CharacterCurrentList",(data: Array<any>) => {
			for (var i = 0; i < data.length; i++) {
				this.playerList.Add(data[i]);
			}
		});

		this.socket.on("CharacterMessage",(data: any) => {
			var plr = this.playerList.GetByID(data.ID);
			if (plr == null) return;

			plr.ShowMsg(data.Msg);
		});

		this.socket.on("CharacterRemove",(data: { ID: string }) => {
			this.playerList.Remove(data.ID);
		});

	}
} 