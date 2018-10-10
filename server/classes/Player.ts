import Character = require("./Character");
import Server = require("../Server");
import GameState = require("../GameState");
import Geometry = require("../Geometry");
import {ground} from "../GameState";
import {socketServer} from "../Server";
var startSprites = ["Orc", "Minotaur", "Troll", "Dwarf"];

export class Player implements Character.Character {
    private socket: SocketIO.Socket;
    private syncData = new Character.CharacterDataToSync(startSprites[(Math.random() * 4) | 0]);
    private targetChar: Character.Character;
    private AttackDelay = 850;
    private LastAttackTime = 0;

    constructor(socket: SocketIO.Socket) {
        this.syncData.Position = { x: 160, y: 80 };
        this.syncData.ID = socket.id;
        this.socket = socket;
    }

    Move(data: MoveData) {
        // if (ground.GetCollision(data.Pos.x, data.Pos.y)) {
        //     this.socket.emit("CharacterTeleport", { ID: this.syncData.ID, Data: { Rot: 0, Pos: this.syncData.Position } });
        //     return;
        // }
        ground.FreeCollision(this.syncData.Position.x, this.syncData.Position.y);
        this.syncData.Position.x = data.Pos.x;
        this.syncData.Position.y = data.Pos.y;
        ground.SetCollision(this.syncData.Position.x, this.syncData.Position.y);
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
        socketServer.emit("DeleteCharacters", [this.syncData.ID]);
        ground.FreeCollision(this.syncData.Position.x, this.syncData.Position.y);
       // this.socket.disconnect();

    }

    SelfAnnouce() {
        this.socket.broadcast.emit("NewCharacters", [this.GetJSON()]);
        ground.SetCollision(this.syncData.Position.x, this.syncData.Position.y);
    }

    Target(char: Character.Character) {

        this.targetChar = char;
    }

    Untarget() {

        this.targetChar = null;
    }

    AttackTarget() {

        if (!this.targetChar) return;
        if (this.targetChar.GetHP() < 0) {
            this.targetChar = null; return
        }
        if (!(Date.now() - this.LastAttackTime > this.AttackDelay)) return;
        var dist = Geometry.GetDistance(this.syncData.Position, this.targetChar.GetJSON().Position);
        if (dist > 6) return;

        socketServer.sockets.emit("SpawnProjectile", { Type: 0, StartPos: this.GetJSON().Position, TargetPos: this.targetChar.GetJSON().Position });
        var dmg = Math.random() * this.syncData.Level * 6 | 0 + this.syncData.Level*2;
        var deadInfo = this.targetChar.Hit(dmg);
        if (deadInfo) {
            this.AddExp(deadInfo.Exp);
        }

        this.LastAttackTime = Date.now();
    }

    GetHP(): number {
        return this.syncData.HP;
    }

    Hit(dmg: number): { Exp: number } {
        socketServer.sockets.emit("ApplyDommage", { AttackType: 0, TargetID: this.syncData.ID, HitPoints: dmg });
        this.syncData.HP -= dmg;
        if (this.syncData.HP < 0) {
            this.Kill();
            return { Exp: this.syncData.ExpAtDead * this.syncData.Level };
        }
    }

    Kill() {
        this.syncData.HP = -1;
        this.Dispose();
        socketServer.sockets.emit("Animation", { Sprites: GameState.config.Mobs[this.GetJSON().Race].DeadSprites, Pos: this.syncData.Position, TicksPerFrame: 500 });
    }

    IsDead(): boolean {
        return this.syncData.HP < 0;
    }

    CanMove() {
        return true;
    }

    CanAttack() {
        return (Date.now() - this.LastAttackTime) > this.AttackDelay;
    }

    AddExp(exp: number) {
        this.syncData.CurrentExp += exp;
        if (this.syncData.CurrentExp > GameState.config.Player.LvlExp[this.syncData.Level]) {
            this.syncData.Level++;
            this.syncData.CurrentExp = 0;
            socketServer.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: exp, NextLvl: this.syncData.Level });
            this.syncData.MaxHP += 35;
            this.syncData.HP = this.syncData.MaxHP;
            this.syncData.Speed += 20;
            this.Sync();
        }
        else {
            socketServer.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: exp });
        }
    }
}
