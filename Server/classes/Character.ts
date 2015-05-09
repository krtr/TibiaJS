import Server = require("../Server");

var startSprites = [56, 113, 223, 238];

export class CharacterDataToSync {
    Position = { x: 60, y: 50 };
    StartSprite: number;
    ID: string;

    toJSON() {
        return { Position: this.Position, StartSprite: this.StartSprite, ID: this.ID };
    }

    constructor() {
        this.ID = CharacterDataToSync.lastID.toString();
        CharacterDataToSync.lastID++;
    }

    private static lastID = 0;
}


export class Character {
    protected syncData = new CharacterDataToSync();

    constructor(pos: Vector2D) {
        this.syncData.Position = pos;
        this.syncData.StartSprite = startSprites[(Math.random() * 4) | 0];
    }

    Move(data: MoveData) {
        Server.io.emit("CharacterMove", { ID: this.syncData.ID, Data: data });

        if (data.Rot === Rotation.Left) {
            this.syncData.Position.x--;
        }
        if (data.Rot === Rotation.Top) {
            this.syncData.Position.y--;
        }
        if (data.Rot === Rotation.Right) {
            this.syncData.Position.x++;
        }
        if (data.Rot === Rotation.Down) {
            this.syncData.Position.y++;
        }
    }

    MoveDir(rot: Rotation) {
        var data = { Rot: rot, Pos: this.syncData.Position };
        this.Move(data);
    }

    GetJSON() {
        return this.syncData.toJSON();
    }

    GetID(): string {
        return this.syncData.ID;
    }

    Dispose() {
        Server.io.emit("CharacterRemove", { ID: this.syncData.ID });
    }

    SelfAnnouce() {
        Server.io.emit("CharacterNew", this.GetJSON());
    }
}