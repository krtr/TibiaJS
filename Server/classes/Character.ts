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
    Hit(dmg: number): { Exp: number };
    Kill();
    IsDead(): boolean
    CanMove(): boolean
    CanAttack(): boolean
    AttackTarget();

}



export class CharacterDataToSync {
    Position = { x: 60, y: 50 };
    Race: string;
    ID: string;
    HP: number;
    MaxHP: number;
    Speed: number;
    MaxExp: number;
    Level = 1;
    CurrentExp = 0;
    ExpAtDead = 0;

    toJSON() {
        return {
            Position: this.Position, Speed: this.Speed, HP: this.HP, MaxHP: this.MaxHP,
            Race: this.Race, ID: this.ID, MaxExp: this.MaxExp, Level: this.Level
        };
    }

    constructor(race : string) {
        this.ID = CharacterDataToSync.lastID.toString();
        this.Race = race;
        this.MaxExp = GameState.config.Player.LvlExp[this.Level];
        this.Speed = GameState.config.Mobs[this.Race].Speed;
        this.ExpAtDead = GameState.config.Mobs[this.Race].Experience;
        CharacterDataToSync.lastID++;
        this.MaxHP = GameState.config.Mobs[this.Race].HP;
        this.HP = GameState.config.Mobs[this.Race].HP;
    }

    private static lastID = 0;
}


