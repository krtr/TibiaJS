class Game {

	private ground: Ground;
	private player: Player;
	private camera: Camera;

	constructor() {
		this.camera = new Camera();
		this.ground = new Ground(this.camera);
		this.player = new Player();
		this.camera.SetCameraTarget(this.player);
		Ticker.Add(this.player);
	}

	Render() {
		this.ground.Render();
		this.player.CheckKeyPress();
		this.player.Render();
		this.camera.UpdateCamera();
	}
}