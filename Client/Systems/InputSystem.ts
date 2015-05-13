class InputSystem implements ISystem {
    private keys = new Array<boolean>(200);
    RequiredSygnature = Componenets.Position + Componenets.Movement + Componenets.Input;
    constructor() {
        this.Setup();
    }

    Process(gameObjList: GameObj[]) {
        for (var i = 0; i < gameObjList.length; i++) {

            if ((gameObjList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;

            var movementComponent = <MovementComponent> gameObjList[i].ComponentList[Componenets.Movement];

            var positionComponent = <PositionComponent> gameObjList[i].ComponentList[Componenets.Position];
            var networkComponent = <PlayerNetworkComponent> gameObjList[i].ComponentList[Componenets.PlayerNetwork];
            if (movementComponent.IsMoving) continue;
            this.processGameObj(movementComponent, positionComponent, networkComponent);
        }

    }

    private processGameObj(movementComponent: MovementComponent, positionComponent: PositionComponent, playerNetwork: PlayerNetworkComponent) {
        if (this.keys[37]) {
            positionComponent.Rotation = Rotation.Left;
            if (playerNetwork) playerNetwork.SendMove(positionComponent.TilePosition, positionComponent.Rotation);
            movementComponent.SetTarget(positionComponent.TilePosition.x - 1, positionComponent.TilePosition.y);
            movementComponent.IsMoving = true;


        }
        if (this.keys[38]) {
            positionComponent.Rotation = Rotation.Top;
            if (playerNetwork) playerNetwork.SendMove(positionComponent.TilePosition, positionComponent.Rotation);
            movementComponent.SetTarget(positionComponent.TilePosition.x, positionComponent.TilePosition.y - 1);
            movementComponent.IsMoving = true;


        }
        if (this.keys[39]) {
            positionComponent.Rotation = Rotation.Right;
            if (playerNetwork) playerNetwork.SendMove(positionComponent.TilePosition, positionComponent.Rotation);
            movementComponent.SetTarget(positionComponent.TilePosition.x + 1, positionComponent.TilePosition.y);
            movementComponent.IsMoving = true;


        }
        if (this.keys[40]) {
            positionComponent.Rotation = Rotation.Down;
            if (playerNetwork) playerNetwork.SendMove(positionComponent.TilePosition, positionComponent.Rotation);
            movementComponent.SetTarget(positionComponent.TilePosition.x, positionComponent.TilePosition.y + 1);
            movementComponent.IsMoving = true;
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