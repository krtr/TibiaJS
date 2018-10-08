import {ISystem} from "../Game";
import {Componenets, PositionComponent} from "../BasicComponents";
import {World} from "../World";
import {Vector2D} from "../../Interchange/DataStructures";

export class CameraSystem implements ISystem {
    private cameraPosList = new Array<Vector2D>();
    RequiredSygnature = Componenets.Camera + Componenets.Position;


    Process(world: World) {
        var objList = world.entityList;
        for (var i = 0; i < objList.length; i++) {
            if ((objList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;

            var positionComponent = <PositionComponent> objList[i].ComponentList[Componenets.Position];
            this.cameraPosList.push({ x: positionComponent.PixelPosition.x, y: positionComponent.PixelPosition.y });
        }
    }



    GetCamerasList(): Array<Vector2D> {
        var cameralist = this.cameraPosList;
        this.cameraPosList = [];

        return cameralist;
    }
}