import Character = require("./Character");

class Player extends Character.Character {
	private socket: SocketIO.Socket;
   
    constructor(socket: SocketIO.Socket) {
        super({ x:60, y:50});
        this.syncData.ID = socket.id;
        this.socket = socket;
		
	}

    Sync() {
        this.socket.emit("PlayerStart", this.GetJSON());
    }

    Dispose() {
        super.Dispose();
        this.socket.disconnect();
    }

}


export = Player;