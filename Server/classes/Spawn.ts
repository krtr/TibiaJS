import Mob = require("./Mob");
import Player = require("./Player");
import Geometry = require("../Geometry");
import GameState = require("../GameState");

class Spawn {
    private mobList = new Array<Mob>();
    private pos: Vector2D;
    private desiredMobCount = 0;

    constructor(posX: number, posY: number) {
        this.pos = { x: posX, y: posY };
    }

    MaintainMobCount(count: number) {
        this.desiredMobCount = count;
    }

    Process() {
        if (this.mobList.length < this.desiredMobCount) this.addNew();
        for (var i = 0; i < this.mobList.length; i++) {
            if (this.mobList[i].IsDead()) {
                GameState.CharacterList.RemoveByID(this.mobList[i].GetID());
                this.mobList.splice(i, 1);
                i--;
            }

            var nearestPlr = this.getNearestPlayer(this.mobList[i]);
            if (!nearestPlr) return;
            var mobPos = nearestPlr.GetJSON().Position;
            var plrPos = this.mobList[i].GetJSON().Position;
            var dist = Geometry.GetDistance(mobPos, plrPos);

            this.mobList[i].Target(nearestPlr);
            this.mobList[i].AttackTarget();

            if (dist < 7 && dist > 1.5) {
                this.mobList[i].MoveByVector({ x: mobPos.x - plrPos.x, y: mobPos.y - plrPos.y });
            }
            if (dist >= 7) {
                this.mobList[i].IdleMoving();
            }
        }
    }

    private addNew() {
        var char = new Mob({ x: ((Math.random() - 0.5) * 4 + this.pos.x) | 0, y: ((Math.random() - 0.5) * 4 + this.pos.y) | 0 });
        char.SelfAnnouce();
        GameState.CharacterList.AddNewMob(char);
        this.mobList.push(char);
    }

    private getNearestPlayer(mob: Mob) {

        var lastDist = 1000000;
        var selectedPlayer: Player;
        GameState.CharacterList.ForEachPlayer((plr) => {
            var tmpDist = Geometry.GetDistance(plr.GetJSON().Position, mob.GetJSON().Position)
            if (tmpDist < lastDist) {
                lastDist = tmpDist;
                selectedPlayer = plr;
            }
        });

        return selectedPlayer;
    }
}

export = Spawn;
