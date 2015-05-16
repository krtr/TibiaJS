class InputSystem implements ISystem {
    private keys = new Array<boolean>(200);
    private chatInput = <HTMLInputElement>document.getElementById("ChatInput");
    private canvas = <HTMLCanvasElement> document.getElementById("GameCanvas");
    private chatMsgs = new Array<string>();
    private mouseClicks = new Array<Vector2D>();
    RequiredSygnature = Componenets.Position + Componenets.Movement + Componenets.Input;


    constructor() {
        this.Setup();
    }

    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < gameObjList.length; i++) {

            if ((gameObjList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;


            this.KeyboardInput(gameObjList[i], world);
            this.CheckChatWindow(gameObjList[i], world);
        }

    }

    private KeyboardInput(gameObj: GameObj, world: World) {
        var movementComponent = <MovementComponent> gameObj.ComponentList[Componenets.Movement];
        var positionComponent = <PositionComponent> gameObj.ComponentList[Componenets.Position];
        if (movementComponent.IsMoving) return;

        if (this.keys[37]) {
            positionComponent.Rotation = Rotation.Left;
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Left,
                Pos: { x: positionComponent.TilePosition.x - 1, y: positionComponent.TilePosition.y }
            });
            movementComponent.SetTarget(positionComponent.TilePosition.x - 1, positionComponent.TilePosition.y);
            return;
        }

        if (this.keys[38]) {
            positionComponent.Rotation = Rotation.Top;
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Top,
                Pos: { x: positionComponent.TilePosition.x, y: positionComponent.TilePosition.y - 1 }
            });

            movementComponent.SetTarget(positionComponent.TilePosition.x, positionComponent.TilePosition.y - 1);
            return;
        }

        if (this.keys[39]) {
            positionComponent.Rotation = Rotation.Right;
            world.PushEvent(gameObj, Events.PlayerMove, {
                Rot: Rotation.Right,
                Pos: { x: positionComponent.TilePosition.x + 1, y: positionComponent.TilePosition.y }
            });
            movementComponent.SetTarget(positionComponent.TilePosition.x + 1, positionComponent.TilePosition.y);
            return;
        }

        if (this.keys[40]) {
            positionComponent.Rotation = Rotation.Down;
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

    PerformsOver(componentList: IComponent[]): boolean {
        return componentList["Input"] && componentList["Position"];
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
                this.chatMsgs.push(this.chatInput.value.substr(0,55));
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
            console.log(x, y);
            this.mouseClicks.push({ x: x, y: y });
        });
    }

}