///<reference path='ticker.ts' />
///<reference path='ground.ts' />
///<reference path='player.ts' />
///<reference path='KeyboardManager.ts' />
///<reference path='game.ts' />

var renderer: SpriteGL.SpriteRenderer;
var game = new Game();

window.onload = function () {
	var image = new Image();
	image.src = "sprites.png";
	image.onload = function () {
		renderer = SpriteGL.SpriteRenderer.fromCanvas(<HTMLCanvasElement>document.getElementById("GameCanvas"), image);
		requestAnimationFrame(Loop);
	}
	KeyboardManager.Start();
	Ticker.Start();
}

function Loop() {
	game.Render();
	renderer.RenderAll();
	requestAnimationFrame(Loop);
}

function DrawSprite(index:number, posx:number, posy:number) {
	renderer.DrawSpr((index % 32) * 32, ((index / 32) | 0) * 32, 32, 32, posx, posy, config.TileSize, config.TileSize);
}

enum Rotation { Down, Top, Right, Left };
enum Mob { Dwarf = 56, Ghul = 193, Minotaur = 223, Troll = 238 }