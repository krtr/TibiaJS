import {Mob} from "./Mob";
import {characterList, config} from "../GameState";
import {Player} from "./Player";
import {GetDistance} from "../Geometry";


export class Spawn {
    private mobList = new Array<Mob>();
    private pos: Vector2D;
    private desiredMobCount = 0;
    private newList = new Array<number>();

    constructor(posX: number, posY: number) {
        this.pos = {x: posX, y: posY};
    }

    MaintainMobCount(count: number) {
        this.desiredMobCount = count;
    }

    Process() {
        if (this.mobList.length + this.newList.length < this.desiredMobCount) {
            this.newList.push(Date.now());
        }

        if (this.newList.length > 0) {
            if ((this.newList[0] + config.MobSpawnDelay) < Date.now()) {
                this.addNew();
                this.newList.splice(0, 1);
            }
        }

        for (var i = 0; i < this.mobList.length; i++) {
            if (this.mobList[i].IsDead()) {
                characterList.RemoveByID(this.mobList[i].GetID());
                this.mobList.splice(i, 1);
                i--;
                continue;
            }

            var nearestPlr = this.getNearestPlayer(this.mobList[i]);
            if (!nearestPlr) return;
            var plrPos = nearestPlr.GetJSON().Position;
            var mobPos = this.mobList[i].GetJSON().Position;
            var dist = GetDistance(mobPos, plrPos);

            this.mobList[i].Target(nearestPlr);
            this.mobList[i].AttackTarget();

            if (dist < 7 && dist > 1.5) {
                this.mobList[i].MoveByVector({x: mobPos.x - plrPos.x, y: mobPos.y - plrPos.y});
            }
            if (dist >= 7) {
                this.mobList[i].IdleMoving();
            }
        }
    }

    private addNew() {
        var char = new Mob({
            x: ((Math.random() - 0.5) * 4 + this.pos.x) | 0,
            y: ((Math.random() - 0.5) * 4 + this.pos.y) | 0
        });
        char.SelfAnnouce();
        characterList.AddNewMob(char);
        this.mobList.push(char);
    }

    private getNearestPlayer(mob: Mob) {

        var lastDist = 1000000;
        var selectedPlayer: Player;
        characterList.ForEachPlayer((plr) => {
            var tmpDist = GetDistance(plr.GetJSON().Position, mob.GetJSON().Position)
            if (tmpDist < lastDist) {
                lastDist = tmpDist;
                selectedPlayer = plr;
            }
        });

        return selectedPlayer;
    }
}
