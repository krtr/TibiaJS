import GameState = require("./GameState");
import Character = require("./classes/Character");
import Geometry = require("./Geometry");

var intervalHandle: NodeJS.Timer;
var moblist = new Array<Character.Character>();
export function Start() {
    intervalHandle = setInterval(Loop, 1000);
    for (var i = 0; i < 10; i++) {
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
    for (var i = 0; i < moblist.length; i++) {
       
            var plr = GetNearestPlayer(moblist[i]);
            if (!plr) continue;
            var plrPos = plr.GetJSON().Position;
            var charPos = moblist[i].GetJSON().Position;
            var rot = Geometry.GetRotationFromV({ x: charPos.x - plrPos.x, y: charPos.y - plrPos.y });
            moblist[i].MoveDir(rot);
        
    }
}

function AddNew() {
    var char = new Character.Character({ x: ((Math.random() - 0.5) * 20 + 60) | 0, y: ((Math.random() - 0.5) * 20 + 50) | 0 });
    moblist.push(char);
    char.SelfAnnouce();
    GameState.CharacterList.AddNewMob(char);
}