
///<reference path='ground.ts' />
///<reference path='player.ts' />
///<reference path='game.ts' />

var renderer: SpriteGL.SpriteRenderer;
var game;
var config: Config;

//TODO loader for assets
window.onload = function () {
	GET("data.json", function (err, data) {
		config = JSON.parse(data); 
		console.log("CONFIG");
		if (renderer) Start();
	});

	var image = new Image();
	image.src = "sprites.png";
	image.onload = function () {
		renderer = SpriteGL.SpriteRenderer.fromCanvas(<HTMLCanvasElement>document.getElementById("GameCanvas"), image);
		if (config) Start();
	}

	function Start() {
		game = new Game();
		requestAnimationFrame(Loop);
		GameServices.InitServices();
	}
}

function Loop() {
	game.Render();
	GameServices.ProcessServces();
	renderer.RenderAll();
	requestAnimationFrame(Loop);
}

function DrawSprite(index: number, posx: number, posy: number) {
	renderer.DrawSpr((index % 32) * 32, ((index / 32) | 0) * 32, 32, 32, posx, posy, config.TileSize, config.TileSize);
}

function DrawHealthBar(percent: number, posx: number, posy: number) {
	renderer.DrawSpr(129, 386, 26, 4, posx, posy, 26, 4);
}

