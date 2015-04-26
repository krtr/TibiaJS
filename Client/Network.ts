class Network {

	socket: SocketIOClient.Socket;
	playerList: PlayersList;
	constructor(playerList: PlayersList) {
		this.playerList = playerList;
	}

	Connect() {
		this.socket = io.connect();
		console.log("Connection");
		this.SetupConn();
	}

	private SetupConn() {

		this.socket.on("PlayerStart",(data) => {
			console.log(JSON.stringify(data));
			this.playerList.SyncCurrentPlayer(data);
		});

		this.socket.on("PlayerMove",(data: { ID: string; Data: MoveData }) => {
			var plr = this.playerList.GetByID(data.ID);
			if (plr) {
				plr.Move(data.Data.Rot);
			}
		});

		this.socket.on("PlayerNew",(data) => {
			this.playerList.Add(data);
		});

		this.socket.on("PlayerCurrentList",(data: Array<any>) => {
			for (var i = 0; i < data.length; i++) {
				this.playerList.Add(data[i]);
			}
		});

		this.socket.on("PlayerDisconnected",(data: { ID: string }) => {
			this.playerList.Remove(data.ID);
		});

	}
} 