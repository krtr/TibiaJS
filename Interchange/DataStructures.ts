const enum Rotation { Down, Top, Right, Left };

interface Vector2D { x: number; y: number; }

interface MoveData { Rot: Rotation; Pos: Vector2D }

interface NewCharacterData {
    Position: Vector2D;
    Race: string;
    ID: string;
    HP: number;
    MaxHP: number;
    Speed: number;
    MaxExp: number;
    Level: number;
}

interface Config {
    TileSize: number;
    MapWidth: number;
    MapHeight: number;
    ZIndexes: {
        Fluid: number,
        Corpse: number,
        Character: number
    },
    MobSpawnDelay: number;
    Player: {
        LvlExp: number[]
    }
    MobSpawns: SpawnData[],
    Mobs: {
        Dwarf: MobData;
        Orc: MobData;
        Minotaur: MobData;
    };
    Animations: {
        Beam: AnimationData;
        Explosion1: AnimationData;
        Explosion2: AnimationData;
        Explosion3: AnimationData;
        BloodSpread: AnimationData;
        BloodPuddle: AnimationData;
    };
};

interface SpawnData {
    Position: Vector2D;
    Count: number
}

interface MobData {
    AliveSprites: number[];
    DeadSprites: number[];
    Experience: number;
    Speed: number;
    HP: number;
}

interface AnimationData {
    Sprites: number[];
}