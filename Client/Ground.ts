class Ground {

	private camera: Camera;
	constructor(camera: Camera) {
		this.camera = camera;
	}

	Render() {
		var cameraPos = this.camera.GetCameraPos();
		var startX = (cameraPos.x / config.TileSize - 432 / config.TileSize) | 0;
		var endX = (startX + 868 / config.TileSize) | 0;
		var startY = (-cameraPos.y / config.TileSize - 300 / config.TileSize) | 0;
		var endY = (startY + 668 / config.TileSize) | 0;
		if (startX < 0) startX = 0;
		if (startY < 0) startY = 0;
		if (endX > mapConfig.MapWidth - 1) endX = mapConfig.MapWidth - 1;
		if (endY > mapConfig.MapHeight - 1) endY = mapConfig.MapHeight - 1;
		console.log(startX, startY);
		for (var i = startY; i < endY; i++)
			for (var j = startX; j < endX; j++) {
				DrawSprite(mapConfig.Data[i * mapConfig.MapWidth + j] - 1, (j * config.TileSize), -i * config.TileSize);
			}
	}
} 