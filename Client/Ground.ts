class Ground {

	private camera: Camera;
	constructor(camera: Camera) {
		this.camera = camera;
	}

	Render() {
		var cameraPos = this.camera.GetCameraPos();
		var startX = ((cameraPos.x - 400) / config.TileSize) | 0;
		//startX -= 1;
		var endX = (startX + 800 / config.TileSize) | 0;
		endX += 1;
		var startY = ((cameraPos.y - 300) / config.TileSize) | 0;
		//startY -= 1;
		var endY = (startY + 600 / config.TileSize) | 0;
		endY += 2;
		if (startX < 0) startX = 0;
		if (startY < 0) startY = 0;
		if (endX > config.MapWidth - 1) endX = config.MapWidth - 1;
		if (endY > config.MapHeight - 1) endY = config.MapHeight - 1;
		for (var i = startY; i < endY; i++)
			for (var j = startX; j < endX; j++) {
				DrawSprite(config.Data[i * config.MapWidth + j] - 1, (j * config.TileSize), i * config.TileSize);
			}
	}

	GetCollision(x: number, y: number): number {
		return config.Collision[y * config.MapWidth + x];
	}
} 