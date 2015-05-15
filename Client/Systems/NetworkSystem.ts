class NetworkSystem {
    private socket: SocketIOClient.Socket;
    private newEntityList = [];
    private EntityToRemove = [];
    private entityToModification = new Array< { ID; Type; Data; }>();

    connect(url = null) {
        if (!url) {
            this.socket = io.connect();
        } else {
            this.socket = io.connect(url);
        }

        this.Setup();
    }

    Process(world: World) {
        for (var i = 0; i < this.EntityToRemove.length; i++) {
            world.RemoveEntity(this.EntityToRemove[i]);
        }

        for (var i = 0; i < this.newEntityList.length; i++) {
            world.Add(this.newEntityList[i]);
        }

        this.ProcessEvents(world);
        this.ModifyEntities(world.entityList);

        this.cleanup();
      
    }

    private Setup() {
        this.socket.on("NewCharacters", (data: NewCharacterData[]) => {
            for (var i = 0; i < data.length; i++) {
                var gameObj = new GameObj();
                gameObj.ID = data[i].ID;
                gameObj.AddComponent(new PositionComponent(data[i].Position.x, data[i].Position.y, Rotation.Down));
                gameObj.AddComponent(new MovementComponent());
                gameObj.AddComponent(new HealthComponent(100, 100));
                gameObj.AddComponent(new SpriteComponent(config.Mobs[data[i].Race].Sprites[0], { x: -10, y: -10 }));
                gameObj.AddComponent(new CharacterAnimationComponent(config.Mobs[data[i].Race].Sprites));
                this.newEntityList.push(gameObj);
            }
        });

        this.socket.on("PlayerStart", (data: NewCharacterData) => {
            var gameObj = new GameObj();
            console.log(data);
            gameObj.ID = data.ID;
            gameObj.AddComponent(new PositionComponent(data.Position.x, data.Position.y, Rotation.Down));
            gameObj.AddComponent(new MovementComponent());
            gameObj.AddComponent(new CharacterAnimationComponent(config.Mobs[data.Race].Sprites));
            gameObj.AddComponent(new SpriteComponent(config.Mobs[data.Race].Sprites[0], { x: -10, y: -10 }));
            gameObj.AddComponent(new InputComponent());
            gameObj.AddComponent(new HealthComponent(100, 100));
            gameObj.AddComponent(new CameraComponent());
            this.newEntityList.push(gameObj);
            console.log("New Player");
        });

        this.socket.on("CharacterMessage", (data: { Msg: string, ID }) => {
            this.entityToModification.push({ ID: data.ID, Type: ModType.Message, Data: data.Msg });
        });

        this.socket.on("CharacterMove", (data: { ID; Data: MoveData }) => {
            this.entityToModification.push({ ID: data.ID, Type: ModType.Move, Data: data.Data });
        });

        this.socket.on("CharacterTeleport", (data: { ID; Data: MoveData }) => {
            this.entityToModification.push({ ID: data.ID, Type: ModType.Teleport, Data: data.Data });
        });

        this.socket.on("DeleteCharacters", (data: any[]) => {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                this.EntityToRemove.push(data[i]);
            }
        });
    }

    private ProcessEvents(world: World) {
        var plrMoveEventList = world.GetEventByType(Events.PlayerMove);
        for (var i = 0; i < plrMoveEventList.length; i++) {
            this.socket.emit("PlayerMove", plrMoveEventList[i].Payload);
        }

        var msgEventList = world.GetEventByType(Events.PlayerMessage);
        for (var i = 0; i < msgEventList.length; i++) {
            this.socket.emit("PlayerMessage", { Msg: msgEventList[i].Payload });
        }
    }

    private ModifyEntities(gameObjList: GameObj[]) {
        for (var j = 0; j < gameObjList.length; j++) {
            var movement = <MovementComponent>gameObjList[j].ComponentList[Componenets.Movement];
            var position = <PositionComponent>gameObjList[j].ComponentList[Componenets.Position];

            for (var i = 0; i < this.entityToModification.length; i++) {
                if (this.entityToModification[i].ID !== gameObjList[j].ID) continue;
                if (this.entityToModification[i].Type === ModType.Move) {
                    if (!movement) continue;
                    movement.SetTarget(this.entityToModification[i].Data.Pos.x, this.entityToModification[i].Data.Pos.y);
                    position.Rotation = this.entityToModification[i].Data.Rot;
                }

                if (this.entityToModification[i].Type === ModType.Teleport) {
                    if (!movement) continue;
                    movement.IsMoving = false;
                    movement.SetTarget(this.entityToModification[i].Data.Pos.x, this.entityToModification[i].Data.Pos.y);
                    position.SetPosition(this.entityToModification[i].Data.Pos.x, this.entityToModification[i].Data.Pos.y);
                }

                if (this.entityToModification[i].Type === ModType.Message) {
                    var chMsg = <CharacterMessageComponent>gameObjList[j].ComponentList[Componenets.CharacterMessage];
                    if (!chMsg) {
                        gameObjList[j].AddComponent(new CharacterMessageComponent(this.entityToModification[i].Data));
                    } else {
                        chMsg.Str = this.entityToModification[i].Data;
                    }

                }
            }
        }
    }

    private cleanup() {
        this.newEntityList = [];
        this.entityToModification = [];
        this.EntityToRemove = [];
    }
}

const enum ModType { Move, Teleport, Message  };