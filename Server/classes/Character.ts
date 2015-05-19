
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
    Hit(dmg: number);
    Kill();
    IsDead(): boolean
    CanMove(): boolean
    CanAttack(): boolean

}



export class CharacterDataToSync {
    Position = { x: 60, y: 50 };
    Race: string;
    ID: string;
    HP: number;
    MaxHP: number

    toJSON() {
        return { Position: this.Position, HP: this.HP, MaxHP: this.MaxHP, Race: this.Race, ID: this.ID };
    }

    constructor() {
        this.ID = CharacterDataToSync.lastID.toString();
        CharacterDataToSync.lastID++;
        this.MaxHP = 100;
        this.HP = 100;
    }

    private static lastID = 0;
}


