var config = {
	TileSize: 32,
	Animations: [
		{ StartSprite: 48, SpriteCount: 7 }
	],
	Mobs: {
		Minotaur: {
			StartSprite: 223
		},
		Dwarf: {
			StartSprite: 56
		},
		Orc: {
			StartSprite: 113
		},
		Troll: {
			StartSprite: 238
		}
	}
}

interface MobData {
	StartSprite: number;
}