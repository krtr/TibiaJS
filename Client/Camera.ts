class Camera {
	private cameraTarget: ICameraTarget;
	private canvasSize = { width: 800, height: 600 };

	constructor(CameraTarget: ICameraTarget = { PixelPosition: { x: 400, y: -400 } }) {
		this.cameraTarget = CameraTarget;
	}

	UpdateCamera() {
		renderer.UpdateCamera(this.cameraTarget.PixelPosition.x | 0, this.cameraTarget.PixelPosition.y | 0);
	}

	SetCameraTarget(Cameratarget: ICameraTarget) {
		this.cameraTarget = Cameratarget;
	}

	GetCameraPos(): { x: number; y: number } {
		return this.cameraTarget.PixelPosition;
	}
}


interface ICameraTarget {
	PixelPosition: { x: number; y: number }
}