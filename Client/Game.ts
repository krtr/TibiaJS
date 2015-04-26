class Game {
	private ground: Ground;
	private camera = new Camera();
	private animations = new AnimationContainer();
	private network: Network;
	private playerList = new PlayersList();
	constructor() {
		this.ground = new Ground(this.camera);
		this.network = new Network(this.playerList);
		var player = new Player(this.ground, this.network, config.Mobs.Dwarf.StartSprite);
		this.playerList.SetCurrentPlayer(player);
		
		this.network.Connect();
		this.camera.SetCameraTarget(player);

		Ticker.Add(this.playerList, 150);
		Ticker.Add(this.animations, 50);

		player.Teleport(59, 50);
		this.animations.Add(config.Animations.Beam, player.TilePosion);
	}

	Render() {
		this.ground.Render();
		this.playerList.Render();
		this.animations.Render();
		this.camera.UpdateCamera();
	}
}