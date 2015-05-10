class SpriteDrawer {
    renderer: SpriteGL.SpriteRenderer;
    constructor(renderer: SpriteGL.SpriteRenderer) {
        this.renderer = renderer;
    }

    DrawSprite(index: number, posx: number, posy: number) {
        this.renderer.DrawSpr((index % 32) * 32, ((index / 32) | 0) * 32, 32, 32, posx, posy, config.TileSize, config.TileSize);
    }

    DrawHealthBar(percent: number, posx: number, posy: number) {
        if (percent > 90) { this.renderer.DrawSpr(129, 386, 26, 4, posx, posy, 26, 4); return; }
        if (percent > 75) { this.renderer.DrawSpr(129, 391, 26, 4, posx, posy, 26, 4); return; }
        if (percent > 60) { this.renderer.DrawSpr(129, 396, 26, 4, posx, posy, 26, 4); return; }
        if (percent > 45) { this.renderer.DrawSpr(129, 401, 26, 4, posx, posy, 26, 4); return; }
        if (percent > 35) { this.renderer.DrawSpr(161, 386, 26, 4, posx, posy, 26, 4); return; }
        if (percent > 20) { this.renderer.DrawSpr(161, 391, 26, 4, posx, posy, 26, 4); return; }
        if (percent > 10) { this.renderer.DrawSpr(161, 396, 26, 4, posx, posy, 26, 4); return; }
        this.renderer.DrawSpr(161, 401, 26, 4, posx, posy, 26, 4);
    }
}