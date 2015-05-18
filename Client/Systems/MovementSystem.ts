class MovementSystem {
    RequiredSygnature = Componenets.Position + Componenets.Movement;
    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < gameObjList.length; i++) {
            if ((gameObjList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;
            var positionComponent = <PositionComponent> gameObjList[i].ComponentList[Componenets.Position];
            var movementComponent = <MovementComponent> gameObjList[i].ComponentList[Componenets.Movement];
           
            if (movementComponent.IsMoving) {
                var V = {
                    x: movementComponent.TargetPixelPosition.x - positionComponent.PixelPosition.x,
                    y: movementComponent.TargetPixelPosition.y - positionComponent.PixelPosition.y
                };
                var len = Math.sqrt(V.x * V.x + V.y * V.y);
                V.x /= len;
                V.y /= len;
                positionComponent.PixelPosition.x += V.x * movementComponent.Speed / world.FPS;
                positionComponent.PixelPosition.y += V.y * movementComponent.Speed / world.FPS;
                if (len < movementComponent.Speed/50.0) {
                    if (movementComponent.RemoveOnDone) {
                        gameObjList.splice(i, 1);
                        i--;
                    } else {
                        movementComponent.IsMoving = false;
                        positionComponent.PixelPosition.x = movementComponent.TargetPixelPosition.x
                        positionComponent.PixelPosition.y = movementComponent.TargetPixelPosition.y;
                        positionComponent.TilePosition.x = movementComponent.TargetTilePosition.x;
                        positionComponent.TilePosition.y = movementComponent.TargetTilePosition.y;
                    }
                  
                }
            }

        }
    }
}