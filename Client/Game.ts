
class Game {
	private ground: Ground;
	private camera = new Camera();
	private network: Network;
	private playerList = new CharacterList();
	private chatConsole: ChatConsole;
	constructor() {
		this.ground = new Ground(this.camera);
		this.network = new Network(this.playerList);
		this.chatConsole = new ChatConsole(this.network);
		var player = new Player(this.ground, this.network, config.Mobs.Dwarf.StartSprite);
		this.playerList.SetCurrentPlayer(player);
		
		this.network.Connect();
		this.camera.SetCameraTarget(player);

		GameServices.AddTickListener(this.playerList, 150);
		GameServices.AddKeyboardListener(this.chatConsole);
	}

    Render(spriteDrawer: SpriteDrawer, FPS: number) {
		this.ground.Render(spriteDrawer, FPS);
        this.playerList.Render(spriteDrawer, FPS);
        this.camera.UpdateCamera(spriteDrawer);
	}
}