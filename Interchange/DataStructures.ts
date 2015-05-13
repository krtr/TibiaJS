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
        Dwarf: { Sprites: number[]; };
        Orc: { Sprites: number[]; };
        Minotaur: { Sprites: number[]; };
        Troll: { Sprites: number[]; };
	};
	Animations: {
		Beam: {
			StartSprite: number;
			SpriteCount: number;
		};
	};
	Data: number[];
	Collision: number[];
}

