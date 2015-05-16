
export interface Character {
    Move(data: MoveData);
    MoveDir(rot: Rotation);
    GetJSON();
    GetID(): string;
    Dispose();
    SelfAnnouce();
    Target(char: Character);
    Untarget();
    GetHP(): number;

}



export class CharacterDataToSync {
    Position = { x: 60, y: 50 };
    Race: string;
    ID: string;
    HP: number;
    MaxHP: number

    toJSON() {
        return { Position: this.Position, HP: 100, Race: this.Race, ID: this.ID };
    }

    constructor() {
        this.ID = CharacterDataToSync.lastID.toString();
        CharacterDataToSync.lastID++;
    }

    private static lastID = 0;
}


