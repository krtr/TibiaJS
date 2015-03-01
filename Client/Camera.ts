class Camera {
	private cameraTarget: ICameraTarget;
	private canvasSize = { width: 800, height: 600 };

	constructor(CameraTarget: ICameraTarget = { Position: { x: 400, y: -400 } }) {
		this.cameraTarget = CameraTarget;
	}

	UpdateCamera() {
		renderer.UpdateCamera(this.cameraTarget.Position.x | 0, this.cameraTarget.Position.y| 0);
	}

	SetCameraTarget(Cameratarget: ICameraTarget) {
		this.cameraTarget = Cameratarget;
	}

	GetCameraPos(): { x: number; y: number } {
		return this.cameraTarget.Position;
	}
}


interface ICameraTarget {
	Position: { x: number; y: number }
}