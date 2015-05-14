
export interface Character {
    Move(data: MoveData);
    MoveDir(rot: Rotation);
    GetJSON();
    GetID(): string;
    Dispose();
    SelfAnnouce();
}



export class CharacterDataToSync {
    Position = { x: 60, y: 50 };
    Race: string;
    ID: string;

    toJSON() {
        return { Position: this.Position, Race: this.Race, ID: this.ID };
    }

    constructor() {
        this.ID = CharacterDataToSync.lastID.toString();
        CharacterDataToSync.lastID++;
    }

    private static lastID = 0;
}


