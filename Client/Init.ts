var config: Config;

declare function fetch(src: string): Promise<any>;

window.onload = function () {
    var renderingSystem: RenderingSystem;
    var cameraSystem = new CameraSystem();
    var inputSystem = new InputSystem();
    var movemnetSystem = new MovementSystem();
    var userInterfaceSystem = new UserInterfaceSytem();
    var networkSystem = new NetworkSystem();
    var characterAnimationSystem = new AnimationSystem();
    var world = new World();


    const configPromise = fetch("data.json").then(response => response.json());
    const spritePromise = loadImage("sprites.png");

    Promise.all([configPromise, spritePromise])
        .then(([configData, sprites]) => {
            config = configData;
            const canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
            renderingSystem = new RenderingSystem(canvas, sprites);

            var map = new GameObj();
            map.ID = 1541515125;
            map.AddComponent(new PositionComponent(0, 0));
            map.AddComponent(new RenderMapComponent(config.Data, config.MapWidth, config.MapHeight));
            world.Add(map);
            networkSystem.connect();
            requestAnimationFrame(Loop);
        });


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

