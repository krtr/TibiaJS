
///<reference path='ground.ts' />
///<reference path='player.ts' />
///<reference path='game.ts' />
var config: Config;

window.onload = function () {
    var game;
    var spritedrawer: SpriteDrawer
    var queue = new createjs.LoadQueue(true);
    queue.loadFile({ src: "data.json", id: "config" });
    queue.loadFile({ src: "sprites.png", id: "sprites" });

    queue.on("fileload", function (data: any) {
        if (data.item.id === "config") config = data.result;
        if (data.item.id === "sprites") {
            var canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
            var renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, data.result);
            spritedrawer = new SpriteDrawer(renderer);
        }
    });

    queue.on("complete", function () {
        game = new Game();
        requestAnimationFrame(Loop);
        GameServices.InitServices(spritedrawer);
    });

    function Loop() {
        var FPS = GetFPS();
        game.Render(spritedrawer, FPS);
        GameServices.ProcessServces(spritedrawer, FPS);
        spritedrawer.renderer.RenderAll();
        requestAnimationFrame(Loop);
    }
}

