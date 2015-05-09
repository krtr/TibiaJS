const enum Rotation { Down, Top, Right, Left };

interface Vector2D { x: number; y: number; }

interface MoveData { Rot: Rotation; Pos: Vector2D }


interface Config {
	TileSize: number;
	MapWidth: number;
	MapHeight: number;
	Mobs: {
		Dwarf: { StartSprite: number; };
		Orc: { StartSprite: number; };
		Minotaur: { StartSprite: number; };
		Troll: { StartSprite: number; };
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

