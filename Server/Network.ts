import Server = require("./Server");

class Network {

    SendToAllAnimation(sprites: number[], Pos: Vector2D, TickPerFrame: number, z: number) {
        Server.io.emit("Animation", { Sprites: sprites, Pos: Pos, TicksPerFrame: TickPerFrame, z: z });
    }
}

export = Network;