﻿/// <reference path="../Interchange/DataStructures.ts"/>
/// <reference path="../typings/tsd.d.ts" />

import {GetFPS} from "./Misc";
import RenderingSystem from "./Systems/RenderingSystem";
import CameraSystem from "./Systems/CameraSystem";

import InputSystem from "./Systems/InputSystem";
import MovementSystem from "./Systems/MovementSystem";
import UserInterfaceSytem from "./Systems/UserInterfaceSystem";
import NetworkSystem from "./Systems/NetworkSystem";
import AnimationSystem from "./Systems/AnimationSystem";
import GameObj from "./GameObj";
import {World} from "./World";
import {RenderMapComponent, PositionComponent} from "./BasicComponents";

export var config:Config;
var things: Array<any>;

window.onload = function () {

    var renderingSystem:RenderingSystem
    var cameraSystem = new CameraSystem();
    var inputSystem = new InputSystem();
    var movemnetSystem = new MovementSystem();
    var userInterfaceSystem = new UserInterfaceSytem();
    var networkSystem = new NetworkSystem();
    var characterAnimationSystem = new AnimationSystem();
    var world = new World();


    var configReq = fetch("config.json").then((response) => {
        return response.json();
    }).then((data) => {
        config = data;
    });

    var thingsReq = fetch("things.json").then((response) => {
        return response.json();
    }).then((data) => {
        things = data;
        window["things"] = data;
    });

    var spriteReq = fetch("sprites2.png").then((response) => {
        return response.blob();
    }).then((data) => {
        var objectURL = URL.createObjectURL(data);
        var image = new Image();
        image.src = objectURL;
        return new Promise(function (resolve, reject) {
            image.onload = () => resolve(image);
            image.onerror = reject;
        })
    }).then((image)=> {
        var canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
        SetupCanvas(canvas);
        renderingSystem = new RenderingSystem(canvas, image as any);
    });


    Promise.all([configReq, spriteReq, thingsReq]).then(() => {
        var map = new GameObj();
        map.ID = 1995;
        map.AddComponent(new PositionComponent(0, 0));
        map.AddComponent(new RenderMapComponent(config.MapWidth, config.MapHeight));
        world.Add(map);
        networkSystem.connect();
        renderingSystem.things = things;
        config.TileSize = ((<HTMLCanvasElement>document.getElementById("GameCanvas")).width / 16.0) | 0;
        requestAnimationFrame(Loop);
    });

    function Loop() {
        world.FPS = GetFPS();
        inputSystem.Process(world);

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
function SetupCanvas(canvas:HTMLCanvasElement) {
    var part = ((window.innerHeight * 0.8) / 3);
    canvas.width = part * 4 | 0;
    canvas.height = part * 3 | 0;
    canvas.width = canvas.width - (canvas.width % 2);
    canvas.height = canvas.height - (canvas.height % 2);
}