class Ground {

	private camera: Camera;
	constructor(camera: Camera) {
		this.camera = camera;
	}

	Render() {
		var cameraPos = this.camera.GetCameraPos();
		var startX = (cameraPos.x / config.TileSize - 432 / config.TileSize) | 0;
		var endX = (startX + 832 / config.TileSize) | 0;
		var startY = (-cameraPos.y / config.TileSize - 300 / config.TileSize) | 0;
		var endY = (startY + 668 / config.TileSize) | 0;

		for (var i = startY; i < endY; i++)
			for (var j = startX; j < endX; j++) {
					DrawSprite(config.Map.Data[i * config.Map.MapWidth + j] - 1, (j * config.TileSize), -i * config.TileSize);
			}
	}
} 