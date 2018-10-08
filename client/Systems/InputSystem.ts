import {ISystem} from "../Game";
import {Componenets, HealthComponent, InputComponent, MovementComponent, PositionComponent} from "../BasicComponents";
import {GameObj} from "../GameObj";
import {config} from "../Init";
import {Events, World} from "../World";
import {Rotation, Vector2D} from "../../Interchange/DataStructures";

export class InputSystem implements ISystem {
    private keys = new Array<boolean>(200);
    private chatInput = <HTMLInputElement>document.getElementById("ChatInput");
    private canvas = <HTMLCanvasElement> document.getElementById("GameCanvas");
    private chatMsgs = new Array<string>();
    private mouseClicks = new Array<Vector2D>();
    RequiredSygnature = Componenets.Position + Componenets.Movement + Componenets.Input ;


    constructor() {
        this.Setup();
    }

    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < gameObjList.length; i++) {

            if ((gameObjList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;


            this.KeyboardInput(gameObjList[i], world);
            this.CheckChatWindow(gameObjList[i], world);
            this.CheckClick(gameObjList[i], world);
        }

        this.mouseClicks = [];
    }

    private KeyboardInput(gameObj: GameObj, world: World) {
        var movementComponent = <MovementComponent> gameObj.ComponentList[Componenets.Movement];
        var positionComponent = <PositionComponent> gameObj.ComponentList[Componenets.Position];
        var inputSystem = <InputComponent> gameObj.ComponentList[Componenets.Input];
        if (movementComponent.IsMoving) return;

        if (this.keys[37]) {
            positionComponent.Rotation = Rotation.Left;
            if (inputSystem.IsAlive)
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Left,
                Pos: { x: positionComponent.TilePosition.x - 1, y: positionComponent.TilePosition.y }
            });
            movementComponent.SetTarget(positionComponent.TilePosition.x - 1, positionComponent.TilePosition.y);
            return;
        }

        if (this.keys[38]) {
            positionComponent.Rotation = Rotation.Top;
            if (inputSystem.IsAlive)
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Top,
                Pos: { x: positionComponent.TilePosition.x, y: positionComponent.TilePosition.y - 1 }
            });

            movementComponent.SetTarget(positionComponent.TilePosition.x, positionComponent.TilePosition.y - 1);
            return;
        }

        if (this.keys[39]) {
            positionComponent.Rotation = Rotation.Right;
            if (inputSystem.IsAlive)
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Right,
                Pos: { x: positionComponent.TilePosition.x + 1, y: positionComponent.TilePosition.y }
            });
            movementComponent.SetTarget(positionComponent.TilePosition.x + 1, positionComponent.TilePosition.y);
            return;
        }

        if (this.keys[40]) {
            positionComponent.Rotation = Rotation.Down;
            if (inputSystem.IsAlive)
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Down,
                Pos: { x: positionComponent.TilePosition.x, y: positionComponent.TilePosition.y + 1 }
            });
            movementComponent.SetTarget(positionComponent.TilePosition.x, positionComponent.TilePosition.y + 1);
            return;
        }
    }

    private CheckChatWindow(gameObj: GameObj, world: World) {
        if (this.chatMsgs.length > 0) {
            world.PushEvent(gameObj, Events.PlayerMessage, this.chatMsgs[0]);
            console.log("CheckChatWindow", this.chatMsgs[0]);
            this.chatMsgs = [];
        }
    }

    private CheckClick(gameObj: GameObj, world: World) {
        if ((gameObj.ComponentSygnature & Componenets.Camera) !== Componenets.Camera) return;
        var cameraposcomp = <PositionComponent>gameObj.ComponentList[Componenets.Position];
        for (var i = 0; i < this.mouseClicks.length; i++) {
            var pos = {
                x: this.mouseClicks[i].x + cameraposcomp.PixelPosition.x - this.canvas.width / 2,
                y: this.mouseClicks[i].y + cameraposcomp.PixelPosition.y - this.canvas.height / 2
            };

            for (var entityIndex = 0; entityIndex < world.entityList.length; entityIndex++) {
                if ((world.entityList[entityIndex].ComponentSygnature & (Componenets.Position + Componenets.Health)) !== (Componenets.Position + Componenets.Health))
                    continue;
                if (world.entityList[entityIndex].ID === gameObj.ID) continue;
                var targetPosComp = <PositionComponent>world.entityList[entityIndex].ComponentList[Componenets.Position];
                if (targetPosComp.PixelPosition.x - 10 + config.TileSize > pos.x && targetPosComp.PixelPosition.x - 10 < pos.x) {
                    if (targetPosComp.PixelPosition.y - 10 + config.TileSize > pos.y && targetPosComp.PixelPosition.y - 10 < pos.y) {
                        var targeted = (<HealthComponent>world.entityList[entityIndex].ComponentList[Componenets.Health]).IsTargeted;
                        (<HealthComponent>world.entityList[entityIndex].ComponentList[Componenets.Health]).IsTargeted = !targeted

                        var inputComponent = (< InputComponent > gameObj.ComponentList[Componenets.Input]);
                        if (!targeted) {
                            inputComponent.SetTargetEntity(world.entityList[entityIndex]);
                        } else {
                            inputComponent.FreeTargetedEntity();
                        }

                        world.PushEvent(gameObj, Events.PlayerTarget, { ID: world.entityList[entityIndex].ID, IsTargeting: !targeted });
                        return;
                    }
                }
            }
        }

    }


    private Setup() {
        addEventListener("keydown", (keyEvent) => {
            if (keyEvent.keyCode == 8) {
                if (this.chatInput.value.length > 0) {
                    this.chatInput.value = this.chatInput.value.substr(0, this.chatInput.value.length - 1);
                }
                keyEvent.preventDefault();
            }
            if (this.keys[keyEvent.keyCode]) return;
            this.keys[keyEvent.keyCode] = true;
        });

        addEventListener("keyup", (keyEvent) => {
            this.keys[keyEvent.keyCode] = false;
        });

        addEventListener("keypress", (keyEvent) => {
            var key = keyEvent.keyCode || keyEvent.which;
            if (document.activeElement === this.chatInput) {
                keyEvent.preventDefault();
            }
            if (key === 13) {
                this.chatMsgs.push(this.chatInput.value.substr(0, 55));
                this.chatInput.value = "";
                return;
            }
            if (key === 8) return;
            if (key > 36 && key < 41) return;
            this.chatInput.value += String.fromCharCode(key);
        });

        this.canvas.addEventListener("click", (e) => {
            var x;
            var y;
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            }
            else {
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            x -= this.canvas.offsetLeft;
            y -= this.canvas.offsetTop;

            this.mouseClicks.push({ x: x, y: y });
        });
    }

}