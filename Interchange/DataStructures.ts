const enum Rotation { Down, Top, Right, Left };

interface Vector2D { x: number; y: number; }

interface MoveData { Rot: Rotation; Pos: Vector2D }

interface NewCharacterData {
    Position: Vector2D;
    Race: string;
    ID: string;
}

interface Config {
	TileSize: number;
	MapWidth: number;
	MapHeight: number;
    Mobs: {
        Dwarf: { AliveSprites: number[]; DeadSprites: number[] };
        Orc: { AliveSprites: number[]; DeadSprites: number[] };
        Minotaur: { AliveSprites: number[]; DeadSprites: number[] };
        Troll: { AliveSprites: number[]; DeadSprites: number[]};
	};
	Animations: {
		Beam: {
            Sprites: number[];
		};
	};
	Data: number[];
	Collision: number[];
}

