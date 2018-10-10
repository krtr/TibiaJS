/// <reference path="../Interchange/DataStructures.ts"/>
/// <reference path="../resources/3rd/SpriteGL/bin/SpriteGL.d.ts"/>


import {RenderingSystem} from "./Systems/RenderingSystem";
import {AnimationSystem} from "./Systems/AnimationSystem";
import {NetworkSystem} from "./Systems/NetworkSystem";
import {UserInterfaceSytem} from "./Systems/UserInterfaceSystem";
import {MovementSystem} from "./Systems/MovementSystem";
import {InputSystem} from "./Systems/InputSystem";
import {CameraSystem} from "./Systems/CameraSystem";
import {GameObj} from "./GameObj";
import {PositionComponent, RenderMapComponent} from "./BasicComponents";
import {World} from "./World";
import {GetFPS, loadImage} from "./Misc";

export var config: Config;


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
    const mapPromise = fetch("map.json").then(response => response.json());
    const spritePromise = loadImage("sprites.png");

    Promise.all([configPromise, spritePromise, mapPromise])
        .then(([configData, sprites, mapData]) => {
            config = configData;
            config.Data = mapData;
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

