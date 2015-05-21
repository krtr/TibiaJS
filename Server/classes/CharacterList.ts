import Character = require("./Character");
import Player = require("./Player");
import Mob = require("./Mob");

enum Rotation { Down, Top, Right, Left };
const enum ObjType { Mob, Player };

class CharacterList {
    private moblist = new Array<Mob>();
    private plrlist = new Array<Player>();

    AddNewPlayer(plr: Player) {
        this.plrlist.push(plr);
    }

    AddNewMob(mob: Mob) {
        this.moblist.push(mob);
    }

    GetAllSyncData(): Array<Character.CharacterDataToSync> {
        var result = [];
        this.moblist.forEach((val) => {
            result.push(val.GetJSON());
        });

        this.plrlist.forEach((val) => {
            result.push(val.GetJSON());
        });
        return result;
    }

    ForEach(callback: (plr: Character.Character) => void) {
        this.ForEachMob(callback);
        this.ForEachPlayer(callback);
    }

    ForEachMob(callback: (plr: Mob) => void) {
        for (var i = 0; i < this.moblist.length; i++) {
            callback(this.moblist[i])
        }
    }

    ForEachPlayer(callback: (plr: Player) => void) {
      
        for (var i = 0; i < this.plrlist.length; i++) {
            callback(this.plrlist[i])
        }
    }

    GetByID(ID: string): Character.Character {
        for (var i = 0; i < this.moblist.length; i++) {
            if (this.moblist[i].GetID() === ID) {
                return this.moblist[i];
            }
        }

        for (var i = 0; i < this.plrlist.length; i++) {
            if (this.plrlist[i].GetID() === ID) {
                return this.plrlist[i];
            }
        }

        return null;
    }

    RemoveByID(ID: string): Character.Character {
        var tmpChar;
        for (var i = 0; i < this.moblist.length; i++) {
            if (this.moblist[i].GetID() === ID) {
                tmpChar = this.moblist[i];
                this.moblist.splice(i, 1);
                return tmpChar;
            }
        }

        for (var i = 0; i < this.plrlist.length; i++) {
            if (this.plrlist[i].GetID() === ID) {
                tmpChar = this.plrlist[i];
                this.plrlist.splice(i, 1);
                return tmpChar;
            }
        }

        return null;
    }

    GetMobCount() {
        return this.moblist.length;
    }
}

export = CharacterList;