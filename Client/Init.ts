
///<reference path='ground.ts' />
///<reference path='player.ts' />
///<reference path='game.ts' />

var renderer: SpriteGL.SpriteRenderer;
var FPS = 10;
var config: Config;

window.onload = function () {
    var game;
    var queue = new createjs.LoadQueue(true);
    queue.loadFile({ src: "data.json", id: "config" });
    queue.loadFile({ src: "sprites.png", id: "sprites" });

    queue.on("fileload", function (data: any) {
        if (data.item.id === "config") config = data.result;
        if (data.item.id === "sprites") {
            var canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
            renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, data.result);
        }
    });

    queue.on("complete", function () {
        game = new Game();
        requestAnimationFrame(Loop);
        GameServices.InitServices();
    });

    function Loop() {
        FPS = GetFPS();
        game.Render();
        GameServices.ProcessServces();
        renderer.RenderAll();
        requestAnimationFrame(Loop);
    }
}

