class NetworkSystem {
    private socket: SocketIOClient.Socket;
    private newEntityList = [];
    private entityToModification = new Array< { ID; Type; Data; }>();

    Process(world: World) {
        var gameObjList = world.entityList;
        for (var i = 0; i < this.newEntityList.length; i++) {
            world.Add(this.newEntityList[i]);
        }


        for (var j = 0; j < gameObjList.length; j++) {
            var movement = <MovementComponent>gameObjList[j].ComponentList[Componenets.Movement];
            var position = <PositionComponent>gameObjList[j].ComponentList[Componenets.Position];
            var network = <PlayerNetworkComponent> gameObjList[j].ComponentList[Componenets.PlayerNetwork];


            if (network) {

                if (!network.IsCurrentMoveSynchronisedWithServer) {
                    this.socket.emit("PlayerMove", { Rot: position.Rotation, Pos: position.TilePosition });
                    console.log("MoveData sent");
                    network.IsCurrentMoveSynchronisedWithServer = true;
                }

            }




            if (!movement) continue
            for (var i = 0; i < this.entityToModification.length; i++) {
                if (this.entityToModification[i].ID !== gameObjList[j].ID) continue;
                if (this.entityToModification[i].Type === ModType.Move) {

                    if (!movement) continue;

                    movement.MoveByRotation(position.TilePosition.x, position.TilePosition.y, this.entityToModification[i].Data.Rot);
                    position.Rotation = this.entityToModification[i].Data.Rot;

                }

            }
        }
        this.newEntityList = [];
        this.entityToModification = [];
    }

    connect(url = null) {
        if (!url) {
            this.socket = io.connect();
        } else {
            this.socket = io.connect(url);
        }

        this.Setup();
    }


    private Setup() {
        this.socket.on("NewCharacters", (data: NewCharacterData[]) => {
            for (var i = 0; i < data.length; i++) {
                var gameObj = new GameObj();
                gameObj.ID = data[i].ID;
                gameObj.AddComponent(new PositionComponent(data[i].Position.x, data[i].Position.y, Rotation.Down));
                gameObj.AddComponent(new MovementComponent());
                gameObj.AddComponent(new SpriteComponent(config.Mobs[data[i].Race].Sprites[0], { x: -10, y: -10 }));
                gameObj.AddComponent(new CharacterAnimationComponent(config.Mobs[data[i].Race].Sprites, AnimationPattern.CharacterMovement));
                this.newEntityList.push(gameObj);
            }
        });

        this.socket.on("PlayerStart", (data: NewCharacterData) => {
            var gameObj = new GameObj();
            console.log(data);
            gameObj.ID = data.ID;
            gameObj.AddComponent(new PositionComponent(data.Position.x, data.Position.y, Rotation.Down));
            gameObj.AddComponent(new MovementComponent());
            gameObj.AddComponent(new CharacterAnimationComponent(config.Mobs[data.Race].Sprites, AnimationPattern.CharacterMovement));
            gameObj.AddComponent(new SpriteComponent(config.Mobs[data.Race].Sprites[0], { x: -10, y: -10 }));
            gameObj.AddComponent(new InputComponent());
            gameObj.AddComponent(new PlayerNetworkComponent());
            gameObj.AddComponent(new CameraComponent());
            this.newEntityList.push(gameObj);
            console.log("New Player");
        });

        this.socket.on("CharacterMove", (data: { ID; Data: MoveData }) => {
            this.entityToModification.push({ ID: data.ID, Type: ModType.Move, Data: data.Data });

        });
    }
}

const enum ModType { Move };