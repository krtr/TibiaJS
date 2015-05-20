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
    Player: {
        LvlExp: number[]
    }
    Mobs: {
        Dwarf: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Orc: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Minotaur: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Troll: { AliveSprites: number[]; DeadSprites: number[], Experience: number};
	};
	Animations: {
		Beam: {
            Sprites: number[];
		};
	};
	Data: number[];
	Collision: number[];
}

