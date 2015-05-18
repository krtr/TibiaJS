import GameState = require("./GameState");
import Character = require("./classes/Character");
import Geometry = require("./Geometry");
import Mob = require("./classes/Mob");
var intervalHandle: NodeJS.Timer;

export function Start() {
    intervalHandle = setInterval(Loop, 1500);
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

function GetRotation(desiredMoveV: Vector2D, position: Vector2D) {
    var dataArr = new Array<any>(4);
    var radians = Math.atan2(desiredMoveV.y, desiredMoveV.x);
    dataArr[Rotation.Left] = ({
        can: GameState.Ground.GetCollision(position.x - 1, position.y),
        desire: Math.cos(radians)
    });
    dataArr[Rotation.Down] = ({
        can: GameState.Ground.GetCollision(position.x, position.y + 1),
        desire: Math.cos(radians + (Math.PI / 2))
    });
    dataArr[Rotation.Right] = ({
        can: GameState.Ground.GetCollision(position.x + 1, position.y),
        desire: Math.cos(radians + Math.PI)
    });
    dataArr[Rotation.Top] = ({
        can: GameState.Ground.GetCollision(position.x, position.y - 1),
        desire: Math.cos(radians + (Math.PI / 2 * 3))
    });

    var mostdesire = -1;
    var result = -1;
    for (var i = 0; i < 4; i++) {
        if (!dataArr[i].can && dataArr[i].desire > -0.1) {
            if (dataArr[i].desire > mostdesire) {
                result = i;
                mostdesire = dataArr[i].desire;
            }
        }
    }
    return result;
}

function Loop() {
   GameState.CharacterList.ForEachMob((mob) => {
        var plr = GetNearestPlayer(mob);
        if (!plr) return;
        var plrPos = plr.GetJSON().Position;
        var charPos = mob.GetJSON().Position;
        var rot = GetRotation({ x: charPos.x - plrPos.x, y: charPos.y - plrPos.y }, charPos);
        if (rot !== -1)
            mob.MoveDir(rot);
    });

   GameState.CharacterList.ForEach((char) => {
       if (char.GetHP() < 0) {
           GameState.CharacterList.RemoveByID(char.GetID());
           char.Kill();
       }
   });

    GameState.CharacterList.ForEachPlayer((plr) => {
        plr.AttackTarget();
   });

    if (GameState.CharacterList.GetMobCount() < 5) {
        AddNew();
    }
}

function AddNew() {
    var char = new Mob({ x: ((Math.random() - 0.5) * 20 + 60) | 0, y: ((Math.random() - 0.5) * 20 + 50) | 0 });
    char.SelfAnnouce();
    GameState.CharacterList.AddNewMob(char);
}