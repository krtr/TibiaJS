import Character = require("./Character");
import Server = require("../Server");
import GameState = require("../GameState");

var startSprites = ["Orc", "Minotaur", "Troll", "Dwarf"];



 class Mob implements Character.Character {
    protected syncData = new Character.CharacterDataToSync();

    constructor(pos: Vector2D) {
        this.syncData.Position = pos;
        this.syncData.Race = startSprites[(Math.random() * 4) | 0];
    }

    Move(data: MoveData) {
        GameState.Ground.FreeCollision(this.syncData.Position.x, this.syncData.Position.y);
        this.syncData.Position.x = data.Pos.x;
        this.syncData.Position.y = data.Pos.y;
        GameState.Ground.SetCollision(this.syncData.Position.x, this.syncData.Position.y);
        Server.io.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
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

    GetJSON() {
        return this.syncData.toJSON();
    }

    GetID(): string {
        return this.syncData.ID;
    }

    Dispose() {
        Server.io.emit("DeleteCharacters", [this.syncData.ID]);
        GameState.Ground.FreeCollision(this.syncData.Position.x, this.syncData.Position.y);
    }

    SelfAnnouce() {
        Server.io.emit("NewCharacters", [this.GetJSON()]);
        GameState.Ground.SetCollision(this.syncData.Position.x, this.syncData.Position.y);
    }
}

export = Mob;