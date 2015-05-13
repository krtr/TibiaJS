class CameraSystem implements ISystem {
    private cameraPosList = new Array<Vector2D>();
    RequiredSygnature = Componenets.Camera + Componenets.Position;


    Process(objList: GameObj[]) {
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