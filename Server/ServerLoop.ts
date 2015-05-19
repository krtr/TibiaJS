import GameState = require("./GameState");
import Character = require("./classes/Character");
import Geometry = require("./Geometry");
import Mob = require("./classes/Mob");
var intervalHandle: NodeJS.Timer;

export function Start() {
    intervalHandle = setInterval(Loop, 500);
    intervalHandle = setInterval(NewLoop, 50);
    for (var i = 0; i < 1; i++) {
        AddNew();
    }
}

export function Stop() {
    if (intervalHandle) clearInterval(intervalHandle);
}


function GetNearestPlayer(char: Character.Character) {

    var lastDist = 1000000;
    var selectedPlayer: Character.Character;
    GameState.CharacterList.ForEachPlayer((plr) => {
        var tmpDist = Geometry.GetDistance(plr.GetJSON().Position, char.GetJSON().Position)
        if (tmpDist < lastDist) {
            lastDist = tmpDist;
            selectedPlayer = plr;
        }
    });

    return selectedPlayer;
}

function Loop() {

    GameState.CharacterList.ForEach((char) => {
        if (char.IsDead()) {
            GameState.CharacterList.RemoveByID(char.GetID());
        }
    })

    if (GameState.CharacterList.GetMobCount() < 5) {
        AddNew();
    }
}

function NewLoop() {
    GameState.CharacterList.ForEachPlayer((plr) => {
        plr.AttackTarget();
    });

    GameState.CharacterList.ForEachMob((mob) => {
        var plr = GetNearestPlayer(mob);
        if (!plr) return;
        var plrPos = plr.GetJSON().Position;
        var charPos = mob.GetJSON().Position;
        var dist = Geometry.GetDistance(charPos, plrPos);
        mob.Target(plr);
        mob.AttackTarget();
       
        if (dist < 7) {
            mob.MoveByVector({ x: charPos.x - plrPos.x, y: charPos.y - plrPos.y });
        } else {
            mob.IdleMoving();
        }

    });
}

function AddNew() {
    var char = new Mob({ x: ((Math.random() - 0.5) * 20 + 60) | 0, y: ((Math.random() - 0.5) * 20 + 50) | 0 });
    char.SelfAnnouce();
    GameState.CharacterList.AddNewMob(char);
}