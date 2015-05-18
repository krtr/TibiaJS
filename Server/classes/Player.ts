import Character = require("./Character");
import Server = require("../Server");
import GameState = require("../GameState");
import Geometry = require("../Geometry");
var startSprites = ["Orc", "Minotaur", "Troll", "Dwarf"];

class Player implements Character.Character {
	private socket: SocketIO.Socket;
    private syncData = new Character.CharacterDataToSync();
    private targetChar: Character.Character;
    private AttackDelay = 30;
    private CurretTick = 0;
    private LastTick = 1;
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
        this.CurretTick++;
        if (!this.targetChar) return;
        if (this.targetChar.GetHP() < 0) {
            this.targetChar = null; return
        }
        if (!(this.CurretTick - this.LastTick > this.AttackDelay)) return;
        var dist = Geometry.GetDistance(this.syncData.Position, this.targetChar.GetJSON().Position);
        if (dist > 6) return;

        Server.io.sockets.emit("SpawnProjectile", { Type: 0, StartPos: this.GetJSON().Position, TargetPos: this.targetChar.GetJSON().Position });
        var dmg = Math.random() * 20 | 0 + 9;
        if (this.targetChar.Hit(dmg)) {
            Server.io.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: 20 });
        }

        this.LastTick = this.CurretTick;
    }

    GetHP(): number {
        return this.syncData.HP;
    }

    Hit(dmg: number): boolean {
        Server.io.sockets.emit("ApplyDommage", { AttackType: 0, TargetID: this.syncData.ID, HitPoints: dmg });
        this.syncData.HP -= dmg;
        if (this.syncData.HP < 0) {
            this.Kill();
            return true;
        }

        return false;
    }

    Kill() {
        this.syncData.HP = -1;
        this.Dispose();
        Server.io.sockets.emit("Animation", { Sprites: GameState.config.Mobs[this.GetJSON().Race].DeadSprites, Pos: this.syncData.Position, TicksPerFrame: 500 });
    }

    IsDead(): boolean {
        return this.syncData.HP < 0;
    }
}


export = Player;