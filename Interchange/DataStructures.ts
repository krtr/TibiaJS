enum Rotation { Down, Top, Right, Left };

interface Position { x: number; y: number; }

interface MoveData { Rot: Rotation; Pos: Position }


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

