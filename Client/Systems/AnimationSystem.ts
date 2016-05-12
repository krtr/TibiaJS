import {ISystem} from "../Game";
import {
    Componenets, CharacterAnimationComponent, SimpleAnimationComponent, SpriteComponent,
    PositionComponent, MovementComponent
} from "../BasicComponents";
import {World} from "../World";
import GameObj from "../GameObj";



export default class AnimationSystem implements ISystem {
    private tick = 1;
    RequiredSygnature = Componenets.Movement + Componenets.Sprite + Componenets.CharacterAnimation + Componenets.Position;

    constructor() {
        setInterval(() => { this.tick++; }, 20);
    }

    Process(world: World) {
        var objList = world.entityList;
        for (var i = 0; i < objList.length; i++) {
            var charAnimComponent = <CharacterAnimationComponent> objList[i].ComponentList[Componenets.CharacterAnimation];


            if (charAnimComponent) {
                if ((this.tick % charAnimComponent.TicksPerFrame) === 0) {
                    this.ChracterMovement(objList[i]);
                    continue;
                }
            }


            var simpleAnimComponent = <SimpleAnimationComponent> objList[i].ComponentList[Componenets.SimpleAnimation];

            if (simpleAnimComponent) {
                var spriteComponent = <SpriteComponent> objList[i].ComponentList[Componenets.Sprite];
                if (this.tick % simpleAnimComponent.TicksPerFrame !== 0) continue;
                if (simpleAnimComponent.CurrentFrame >= simpleAnimComponent.AnimationList.length) {
                    world.entityList.splice(i, 1);
                    i--;
                    continue;
                }
                spriteComponent.RenderingSprite = simpleAnimComponent.AnimationList[simpleAnimComponent.CurrentFrame];
                simpleAnimComponent.CurrentFrame++;
            }
        }
    }



    private ChracterMovement(gameObj: GameObj) {
        if ((gameObj.ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) return;

        var positionComponent = <PositionComponent> gameObj.ComponentList[Componenets.Position];
        var characterAnimationComponent = <CharacterAnimationComponent> gameObj.ComponentList[Componenets.CharacterAnimation];
        var spriteComponent = <SpriteComponent> gameObj.ComponentList[Componenets.Sprite];
        var movementComponent = <MovementComponent> gameObj.ComponentList[Componenets.Movement];
        var movingAnimFrameOffset = 0;
        if (movementComponent.IsMoving) {
            movingAnimFrameOffset = (this.tick % 2) + 1;
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