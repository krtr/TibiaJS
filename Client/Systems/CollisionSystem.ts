class ColliisonSystem {

    RequiredSygnature = Componenets.Position + Componenets.Movement;

    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < gameObjList.length; i++) {
            if ((gameObjList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;

            var positionComponent = <PositionComponent> gameObjList[i].ComponentList[Componenets.Position];
            var movementComponent = <MovementComponent> gameObjList[i].ComponentList[Componenets.Movement];
            if (!movementComponent) continue;
            if (!movementComponent.IsMoving) continue;

            if (this.GetCollision(movementComponent.TargetTilePosition.x, movementComponent.TargetTilePosition.y)) {
                movementComponent.IsMoving = false;
                movementComponent.TargetTilePosition.x = positionComponent.TilePosition.x;
                movementComponent.TargetTilePosition.y = positionComponent.TilePosition.y;
                console.log("COLLISION");
            }


        }
    }


    private GetCollision(x, y) {
        return config.Collision[y * config.MapWidth + x]
    }


}