class RenderingSystem implements ISystem {
    private renderer: SpriteGL.SpriteRenderer;
    private mapsToRender = new Array<{ position: PositionComponent; map: RenderMapComponent; }>();

    constructor(canvas: HTMLCanvasElement, textureAtlas: HTMLImageElement) {
        this.renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, textureAtlas);
    }

    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < gameObjList.length; i++) {
            if ((gameObjList[i].ComponentSygnature & Componenets.Position) !== Componenets.Position) continue;
            var positionComponent = <PositionComponent> gameObjList[i].ComponentList[Componenets.Position];
           

            var spriteComponent = <SpriteComponent> gameObjList[i].ComponentList[Componenets.Sprite];
            if (spriteComponent) {
                this.DrawSprite(spriteComponent.RenderingSprite, positionComponent.PixelPosition.x + spriteComponent.SpriteOnTilePos.x,
                    positionComponent.PixelPosition.y + spriteComponent.SpriteOnTilePos.y);
                continue;
            }

            var mapComponent = gameObjList[i].ComponentList[Componenets.RenderMap];
            if (mapComponent) {
                this.mapsToRender.push({ position: positionComponent, map: <any> mapComponent });
            }
        }
    }

   

    RenderAll(cameraList: Array<Vector2D>) {
        if (cameraList.length === 0) return;
        if (this.mapsToRender.length !== 0) {
            this.DrawMap(cameraList[0], this.mapsToRender[0].position.PixelPosition, this.mapsToRender[0].map.Tiles);
        }
        this.mapsToRender = [];
        this.renderer.UpdateCamera(cameraList[0].x, cameraList[0].y);
        this.renderer.RenderAll();
    }

    private DrawSprite(index: number, posx: number, posy: number) {
        this.renderer.DrawSpr((index % 32) * 32, ((index / 32) | 0) * 32, 32, 32, posx, posy, config.TileSize, config.TileSize);
    }

    private DrawMap(cameraPos: Vector2D, mapPos: Vector2D, tileMap: number[]) {
        this.renderer.SetHight(-0.001);
        for (var i = 0; i < this.mapsToRender.length; i++) {
            var startX = ((cameraPos.x - 400) / config.TileSize) | 0;

            var endX = (startX + 800 / config.TileSize) | 0;
            endX += 1;
            var startY = ((cameraPos.y - 300) / config.TileSize) | 0;

            var endY = (startY + 600 / config.TileSize) | 0;
            endY += 2;
            if (startX < 0) startX = 0;
            if (startY < 0) startY = 0;
            if (endX > config.MapWidth - 1) endX = config.MapWidth - 1;
            if (endY > config.MapHeight - 1) endY = config.MapHeight - 1;
            for (var i = startY; i < endY; i++) {
                for (var j = startX; j < endX; j++) {
                    this.DrawSprite(config.Data[i * config.MapWidth + j] - 1, (j * config.TileSize), i * config.TileSize);
                }
            }
        }
        this.renderer.SetHight(0.0);
    }

}
