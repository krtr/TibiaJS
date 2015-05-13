import fs = require("fs");
class Ground {
    private collisionMap: number[];
    private width: number;
    private height: number;

    constructor() {
        var filebuff = fs.readFileSync("./data.json");
        var allconfig = <Config>JSON.parse(filebuff.toString());
        this.collisionMap = allconfig.Collision;
        this.width = allconfig.MapWidth;
        this.height = allconfig.MapHeight;
    }

    GetCollision(x: number, y: number) {
        return this.collisionMap[y * this.width + x];
    }

}