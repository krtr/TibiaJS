class CharacterAnimationSystem implements ISystem {
    private tick = 1;
    RequiredSygnature = Componenets.Movement + Componenets.Sprite + Componenets.CharacterAnimation + Componenets.Position;



    constructor() {
        setInterval(() => { if (this.tick === 1) this.tick = 2; else this.tick = 1; }, 150);
    }

    Process(objList: GameObj[]) {
        for (var i = 0; i < objList.length; i++) {
            if ((objList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;

            var positionComponent = <PositionComponent> objList[i].ComponentList[Componenets.Position];
            var characterAnimationComponent = <CharacterAnimationComponent> objList[i].ComponentList[Componenets.CharacterAnimation];
            var spriteComponent = <SpriteComponent> objList[i].ComponentList[Componenets.Sprite];
            var movementComponent = <MovementComponent> objList[i].ComponentList[Componenets.Movement];
            var movingAnimFrameOffset = 0;
            if (movementComponent.IsMoving) {
                movingAnimFrameOffset = this.tick;
            }
            switch (positionComponent.Rotation) {
                case Rotation.Down:
                    spriteComponent.RenderingSprite = characterAnimationComponent.SpriteList[0 + movingAnimFrameOffset];
                    break;
                case Rotation.Top:
                    spriteComponent.RenderingSprite = characterAnimationComponent.SpriteList[3 + movingAnimFrameOffset];
                    break;
                case Rotation.Right:
                    spriteComponent.RenderingSprite = characterAnimationComponent.SpriteList[6 + movingAnimFrameOffset];
                    break;
                case Rotation.Left:
                    spriteComponent.RenderingSprite = characterAnimationComponent.SpriteList[9 + movingAnimFrameOffset];
                    break;
                default:
                    spriteComponent.RenderingSprite = characterAnimationComponent.SpriteList[0];
            }
           

        }
    }


}