import GameState = require("./GameState");
import Character = require("./classes/Character");
import Geometry = require("./Geometry");

var intervalHandle: NodeJS.Timer;
var moblist = new Array<Character.Character>();
export function Start() {
    intervalHandle = setInterval(Loop, 500);
    for (var i = 0; i < 100; i++) {
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
    dataArr[Rotation.Top] = ({
        can: GameState.Ground.GetCollision(position.x, position.y - 1),
        desire: Math.cos(radians + Math.PI)
    });
    dataArr[Rotation.Right] = ({
        can: GameState.Ground.GetCollision(position.x + 1, position.y),
        desire: Math.cos(radians + (Math.PI / 2 * 3))
    });

    var mostdesire = -1;
    var result = -1;
    for (var i = 0; i < 4; i++) {
        if (!dataArr[i].can) {
            if (dataArr[i].desire > mostdesire) {
                result = i;
                mostdesire = dataArr[i].desire;
            }
        }
    }

    console.log(dataArr);
    return result;
}


function Loop() {
    for (var i = 0; i < moblist.length; i++) {

        var plr = GetNearestPlayer(moblist[i]);
        if (!plr) continue;
        var plrPos = plr.GetJSON().Position;
        var charPos = moblist[i].GetJSON().Position;
        var rot = GetRotation({ x: charPos.x - plrPos.x, y: charPos.y - plrPos.y }, charPos);
        console.log(rot);
        if (rot !== -1)
            moblist[i].MoveDir(rot);


    }
}

function AddNew() {
    var char = new Character.Character({ x: ((Math.random() - 0.5) * 20 + 60) | 0, y: ((Math.random() - 0.5) * 20 + 50) | 0 });
    moblist.push(char);
    char.SelfAnnouce();
    GameState.CharacterList.AddNewMob(char);
}