import Character = require("./Character");
import Server = require("../Server");
import GameState = require("../GameState");

var startSprites = ["Orc", "Minotaur", "Troll", "Dwarf"];

class Player implements Character.Character {
	private socket: SocketIO.Socket;
    private syncData = new Character.CharacterDataToSync();
    private targetChar: Character.Character;
    constructor(socket: SocketIO.Socket) {
      
        this.syncData.Position = { x: 60, y: 50 };
        this.syncData.Race = startSprites[(Math.random() * 4) | 0];
        this.syncData.ID = socket.id;
        this.socket = socket;
		
	}
   
    Move(data: MoveData) {
        if (GameState.Ground.GetCollision(data.Pos.x, data.Pos.y)) {
            this.socket.emit("CharacterTeleport", { ID: this.syncData.ID, Data: { Rot: 0, Pos: this.syncData.Position } });
            return;
        }
        GameState.Ground.FreeCollision(this.syncData.Position.x, this.syncData.Position.y);
        this.syncData.Position.x = data.Pos.x;
        this.syncData.Position.y = data.Pos.y;
        GameState.Ground.SetCollision(this.syncData.Position.x, this.syncData.Position.y);
        this.socket.broadcast.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
    }

    MoveDir(rot: Rotation) {
        var tmpPos = { x: this.syncData.Position.x, y: this.syncData.Position.y };
        if (rot === Rotation.Left) {
            tmpPos.x--;
        }
        if (rot === Rotation.Top) {
            tmpPos.y--;
        }
        if (rot === Rotation.Right) {
            tmpPos.x++;
        }
        if (rot === Rotation.Down) {
            tmpPos.y++;
        }

        var data = { Rot: rot, Pos: tmpPos };
        this.Move(data);
    }

    Sync() {
        this.socket.emit("PlayerStart", this.GetJSON());
    }

  
    GetJSON() {
        return this.syncData.toJSON();
    }

    GetID(): string {
        return this.syncData.ID;
    }

    Dispose() {
        Server.io.emit("DeleteCharacters", [this.syncData.ID]);
        GameState.Ground.FreeCollision(this.syncData.Position.x, this.syncData.Position.y);
        this.socket.disconnect();
       
    }

    SelfAnnouce() {
        Server.io.emit("NewCharacters", [this.GetJSON()]);
        GameState.Ground.SetCollision(this.syncData.Position.x, this.syncData.Position.y);
    }

    Target(char: Character.Character) {
    
        this.targetChar = char;
    }

    Untarget() {
      
        this.targetChar = null;
    }

    AttackTarget() {
        if (!this.targetChar) return;
       
        Server.io.sockets.emit("CharacterAttack", { AttackType: 0, AttarckerID: this.socket.id, TargetID: this.targetChar.GetID(), HitPoints: Math.random() * 10 | 0 });
    }

    GetHP(): number {
        return this.syncData.HP;
    }
}


export = Player;