export const enum Rotation { Down, Top, Right, Left };

export interface Vector2D { x: number; y: number; }

export interface MoveData { Rot: Rotation; Pos: Vector2D }

export interface NewCharacterData {
    Position: Vector2D;
    Race: string;
    ID: string;
    HP: number;
    MaxHP: number;
    Speed: number;
    MaxExp: number;
    Level: number;
}

export interface Config {
    TileSize: number;
    MapWidth: number;
    MapHeight: number;
    MobSpawnDelay: number;
    Player: {
        LvlExp: number[]
    }
    MobSpawns: SpawnData[],
    Mobs: {
        Dwarf: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Orc: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Minotaur: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Troll: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
    };
    Animations: {
        Beam: {
            Sprites: number[];
        };
    };
    Data: number[];
    Collision: number[];
};

export interface SpawnData {
    Position: Vector2D;
    Count: number
}

export interface MobData {
    AliveSprites: number[];
    DeadSprites: number[];
    Experience: number;
    Speed: number;
    HP: number;
}
