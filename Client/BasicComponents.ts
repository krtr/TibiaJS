const enum Componenets {
    Position = 1, Movement = 2, Sprite = 4, CharacterAnimation = 8,
    Camera = 16, SimpleAnimation = 32, Input = 64, RenderMap = 128, PlayerNetwork = 256
}

class PositionComponent implements IComponent {
    Name = Componenets.Position;
    TilePosition: Vector2D;
    PixelPosition: Vector2D;
    Rotation: Rotation;

    constructor(TilePosX: number, TilePosY: number, rot: Rotation) {
        this.TilePosition = { x: TilePosX|0, y: TilePosY|0 };
        this.PixelPosition = { x: this.TilePosition.x * config.TileSize, y: this.TilePosition.y * config.TileSize };
        this.Rotation = rot;
    }

    SetPosition(tilePosX: number, tilePosY: number) {
        this.TilePosition.x = tilePosX;
        this.TilePosition.y = tilePosY;
        this.PixelPosition.x = tilePosX * config.TileSize;
        this.PixelPosition.y = tilePosY * config.TileSize;
    }
}

class MovementComponent implements IComponent {
    Name = Componenets.Movement;
    IsMoving = false;
    TargetTilePosition = { x: 0, y: 0 };
    TargetPixelPosition = { x: 0, y: 0 };

    SetTarget(tileX: number, tileY: number) {
        if (this.IsMoving) return;
        this.TargetTilePosition.x = tileX;
        this.TargetTilePosition.y = tileY;
        this.TargetPixelPosition.x = tileX * config.TileSize;
        this.TargetPixelPosition.y = tileY * config.TileSize;
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

class CharacterAnimationComponent implements IComponent {
    Name = Componenets.CharacterAnimation;
    IsAnimating: boolean;
    SpriteList: Array<number>;

    constructor(array: Array<number>) {
        this.SpriteList = array;
        this.IsAnimating = false;
    }
}

class CameraComponent implements IComponent {
    Name = Componenets.Camera;

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

class SimpleAnimationComponent implements IComponent {
    Name = Componenets.SimpleAnimation;
    AnimationList = new Array<number>();
    IsContinuous = false;
    StartTick = 0;

    constructor(spriteArray: Array<number>, IsContinous: boolean) {
        this.AnimationList = spriteArray;
        this.IsContinuous = IsContinous;
    }
}