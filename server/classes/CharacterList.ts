import {Mob} from "./Mob";
import {Player} from "./Player";
import {Character, CharacterDataToSync} from "./Character";


enum Rotation { Down, Top, Right, Left };
const enum ObjType { Mob, Player };

export class CharacterList {
    private moblist = new Array<Mob>();
    private plrlist = new Array<Player>();

    AddNewPlayer(plr: Player) {
        this.plrlist.push(plr);
    }

    AddNewMob(mob: Mob) {
        this.moblist.push(mob);
    }

    GetAllSyncData(): Array<CharacterDataToSync> {
        var result = [];
        this.moblist.forEach((val) => {
            result.push(val.GetJSON());
        });

        this.plrlist.forEach((val) => {
            result.push(val.GetJSON());
        });
        return result;
    }

    ForEach(callback: (plr: Character) => void) {
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

    GetByID(ID: string): Character {
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

    RemoveByID(ID: string): Character {
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
