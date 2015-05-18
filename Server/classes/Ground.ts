import GameState = require("../GameState");

class Ground {
    private width: number;
    private height: number;

    constructor() {
        this.width = GameState.config.MapWidth;
        this.height = GameState.config.MapHeight;
    }

    GetCollision(x: number, y: number) {
        if (x > this.width) return 1;
        if (x < 0) return 1;
        if (y > this.height) return 1;
        if (y < 0) return 1;
        return GameState.config.Collision[y * this.width + x];
    }

    SetCollision(x: number, y: number) {
        GameState.config.Collision[y * this.width + x] = 1;
    }

    FreeCollision(x: number, y: number) {
        GameState.config.Collision[y * this.width + x] = 0;
    }

}

export = Ground;