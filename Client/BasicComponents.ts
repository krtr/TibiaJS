const enum Componenets {
    Position = 1, Movement = 2, Sprite = 4, CharacterAnimation = 8,
    Camera = 16, AnimationCaster = 32, Input = 64, RenderMap = 128, PlayerNetwork = 256
}

class PositionComponent implements IComponent {
    Name = Componenets.Position;
    TilePosition: Vector2D;
    PixelPosition: Vector2D;
    Rotation: Rotation;

    constructor(TilePosX: number, TilePosY: number, rot: Rotation) {
        this.TilePosition = { x: TilePosX, y: TilePosY };
        this.PixelPosition = { x: this.TilePosition.x * config.TileSize, y: this.TilePosition.y * config.TileSize };
        this.Rotation = rot;
    }
}

class MovementComponent implements IComponent {
    Name = Componenets.Movement;
    IsMoving = false;
    TargetTilePosition = { x: 0, y: 0 };
    TargetPixelPosition = { x: 0, y: 0 };

    SetTarget(tileX: number, tileY: number) {
        this.TargetTilePosition.x = tileX;
        this.TargetTilePosition.y = tileY;
        this.TargetPixelPosition.x = tileX * config.TileSize;
        this.TargetPixelPosition.y = tileY * config.TileSize;
    }

    MoveByRotation(startTilePosX: number, startTilePosY: number, rot: Rotation) {
        if (rot === Rotation.Left) this.SetTarget(startTilePosX - 1, startTilePosY);
        if (rot === Rotation.Top) this.SetTarget(startTilePosX, startTilePosY - 1);
        if (rot === Rotation.Right) this.SetTarget(startTilePosX + 1, startTilePosY);
        if (rot === Rotation.Down) this.SetTarget(startTilePosX, startTilePosY + 1);
        this.IsMoving = true;
    }
}

class SpriteComponent implements IComponent {
    Name = Componenets.Sprite;
    RenderingSprite: number;
    SpriteOnTilePos: Vector2D;
    constructor(sprite: number, SpriteOnTilePos = { x: 0, y: 0 }) {
        this.RenderingSprite = sprite;
        this.SpriteOnTilePos = SpriteOnTilePos;
    }
}

const enum AnimationPattern { CharacterMovement, Iteration };
class CharacterAnimationComponent implements IComponent {
    Name = Componenets.CharacterAnimation;
    IsAnimating: boolean;
    AnimationPattern: AnimationPattern;
    SpriteList: Array<number>;

    constructor(array: Array<number>, animPattern: AnimationPattern) {
        this.SpriteList = array;
        this.AnimationPattern = animPattern;
        this.IsAnimating = false;
    }
}


class CameraComponent implements IComponent {
    Name = Componenets.Camera;

}

interface AnimationCasterEvent {
    AnimType: number;
    Position: Vector2D;
}

class AnimationCasterComponent implements IComponent {
    Name = Componenets.AnimationCaster;

}

class InputComponent implements IComponent {
    Name = Componenets.Input;
}

class RenderMapComponent implements IComponent {
    Name = Componenets.RenderMap;
    Tiles: number[];
    Width: number;
    Height: number;

    constructor(tiles: number[], width: number, height: number) {
        this.Tiles = tiles;
        this.Width = width;
        this.Height = height;
    }
}

class PlayerNetworkComponent implements IComponent {
    Name = Componenets.PlayerNetwork;
    IsCurrentMoveSynchronisedWithServer = false;
}