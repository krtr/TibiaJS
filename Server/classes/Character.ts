import GameState = require("../GameState");
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
    MaxHP: number;
    Speed: number;
    toJSON() {
        return { Position: this.Position, Speed: this.Speed, HP: this.HP, MaxHP: this.MaxHP, Race: this.Race, ID: this.ID };
    }

    constructor(race : string) {
        this.ID = CharacterDataToSync.lastID.toString();
        this.Race = race;
        this.Speed = GameState.config.Mobs[this.Race].Speed;
        CharacterDataToSync.lastID++;
        this.MaxHP = 100;
        this.HP = 100;
    }

    private static lastID = 0;
}


