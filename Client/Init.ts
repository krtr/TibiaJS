
var config: Config;

window.onload = function () {

    var renderingSystem: RenderingSystem;
    var cameraSystem = new CameraSystem();
    var inputSystem = new InputSystem();
    var movemnetSystem = new MovementSystem();
    var collisionSystem = new ColliisonSystem();
    var networkSystem = new NetworkSystem();
    var characterAnimationSystem = new CharacterAnimationSystem();
    var GameObjList = new Array<GameObj>();



    var queue = new createjs.LoadQueue(true);
    queue.loadFile({ src: "data.json", id: "config" });
    queue.loadFile({ src: "sprites.png", id: "sprites" });

    queue.on("fileload", function (data: any) {
        if (data.item.id === "config") { console.log("config loaded"); config = data.result; }
        if (data.item.id === "sprites") {
            var canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
            renderingSystem = new RenderingSystem(canvas, data.result);
        }
    });

    queue.on("complete", function () {
        var map = new GameObj();
        map.AddComponent(new PositionComponent(0, 0, Rotation.Down));
        map.AddComponent(new RenderMapComponent(config.Data, config.MapWidth, config.MapHeight));
        GameObjList.push(map);
        networkSystem.connect();
        requestAnimationFrame(Loop);
    });

    queue.load();

    function Loop() {
        var FPS = GetFPS();
        inputSystem.Process(GameObjList);
        networkSystem.Process(GameObjList);
        collisionSystem.Process(GameObjList);
        characterAnimationSystem.Process(GameObjList);
        movemnetSystem.Process(GameObjList);
        cameraSystem.Process(GameObjList);
        renderingSystem.Process(GameObjList);
        

        renderingSystem.RenderAll(cameraSystem.GetCamerasList());
        requestAnimationFrame(Loop);
    }
}

