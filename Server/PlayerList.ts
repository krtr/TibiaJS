import Player = require("./Player");

enum Rotation { Down, Top, Right, Left };

class PlayerList {
	private list = new Array<Player>();

	AddNew(socket: SocketIO.Socket) {
		var plr = new Player(socket);
		plr.Sync();
		socket.emit("CharacterCurrentList", this.GetAllSyncData());
		this.list.push(plr);
		console.log("connected:" + this.list.length);

		socket.broadcast.emit("CharacterNew", plr.GetSyncData());

		socket.on("PlayerMove", function (data: MoveData) {
			plr.Move(data);
			socket.broadcast.emit("CharacterMove", { ID: socket.id, Data: data });
		});

		socket.on("CharacterMessage", function (data: { Msg: string }) {
			socket.broadcast.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
			socket.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
		});

		
		socket.on("disconnect", () =>{
			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i].GetID() === socket.id) {
					this.list.splice(i, 1);
					console.log("disconnect:" + this.list.length);
					socket.broadcast.emit("CharacterRemove", { ID: socket.id });
					break;
				}
			}
		});
	}

	ForEach(callback: (plr: Player) => void) {
		for (var i = 0; i < this.list.length; i++) {
			callback(this.list[i]);
		}
	}

	private GetAllSyncData(): Array<Player> {
		var result = [];
		for (var i = 0; i < this.list.length; i++) {
			result.push(this.list[i].GetSyncData());
		}
		return result;
	}

	
}

export = PlayerList;