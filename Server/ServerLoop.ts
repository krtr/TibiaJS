import GameState = require("./GameState");
import Character = require("./classes/Character");
import Geometry = require("./Geometry");
import Mob = require("./classes/Mob");
import Spawn = require("./classes/Spawn");
var intervalHandle: NodeJS.Timer;

var spawnList = new Array<Spawn>();

export function Start() {
    intervalHandle = setInterval(NewLoop, 50);
    for (var i = 0; i < GameState.config.MobSpawns.length; i++) {
        spawnList.push(new Spawn(GameState.config.MobSpawns[i].Position.x, GameState.config.MobSpawns[i].Position.y));
        spawnList[i].MaintainMobCount(GameState.config.MobSpawns[i].Count);
    }
}

export function Stop() {
    if (intervalHandle) clearInterval(intervalHandle);
}

function NewLoop() {
    GameState.CharacterList.ForEachPlayer((plr) => {
        plr.AttackTarget();
        if (plr.IsDead()) {
            GameState.CharacterList.RemoveByID(plr.GetID());
        }
    });

    for (var i = 0; i < spawnList.length; i++) {
        spawnList[i].Process();
    }
}
