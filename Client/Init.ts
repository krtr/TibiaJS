
var config: Config;

window.onload = function () {

    var renderingSystem: RenderingSystem;
    var cameraSystem = new CameraSystem();
    var inputSystem = new InputSystem();
    var movemnetSystem = new MovementSystem();
    var userInterfaceSystem = new UserInterfaceSytem();
    var networkSystem = new NetworkSystem();
    var characterAnimationSystem = new AnimationSystem();
    var world = new World();



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
        map.ID = 1541515125;
        map.AddComponent(new PositionComponent(0, 0));
        map.AddComponent(new RenderMapComponent(config.Data, config.MapWidth, config.MapHeight));
        world.Add(map);
        networkSystem.connect();
        requestAnimationFrame(Loop);
    });

    queue.load();

    function Loop() {
        world.FPS = GetFPS();
        inputSystem.Process(world);
        
        //collisionSystem.Process(world);
        characterAnimationSystem.Process(world);
        movemnetSystem.Process(world);
        cameraSystem.Process(world);
      
        
        networkSystem.Process(world);
        userInterfaceSystem.Process(world);
        renderingSystem.Process(world);
        renderingSystem.RenderAll(cameraSystem.GetCamerasList());
       
        world.ClearEvets();
        requestAnimationFrame(Loop);
    }
}

