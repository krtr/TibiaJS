class InputSystem implements ISystem {
    private keys = new Array<boolean>(200);
    RequiredSygnature = Componenets.Position + Componenets.Movement + Componenets.Input;
    constructor() {
        this.Setup();
    }

    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < gameObjList.length; i++) {

            if ((gameObjList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;


            this.processGameObj(gameObjList[i], world);
        }

    }

    private processGameObj(gameObj: GameObj, world: World) {

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

    PerformsOver(componentList: IComponent[]): boolean {
        return componentList["Input"] && componentList["Position"];
    }

    private Setup() {
        addEventListener("keydown", (keyEvent) => {
            if (keyEvent.keyCode == 8) {
                keyEvent.preventDefault();
            }
            if (this.keys[keyEvent.keyCode]) return;
            this.keys[keyEvent.keyCode] = true;
        });

        addEventListener("keyup", (keyEvent) => {
            this.keys[keyEvent.keyCode] = false;
        });
    }
}