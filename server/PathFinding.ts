import {ground} from "./GameState";
import {Vector2D} from "../Interchange/DataStructures";


export function AStar(start: Vector2D, goal: Vector2D) {
    function GetNeighbours(pos: Vector2D) {
        var result = [];
        if (!ground.GetCollision(pos.x - 1, pos.y)) result.push(visitedArray[pos.x - 1][pos.y]);
        if (!ground.GetCollision(pos.x + 1, pos.y)) result.push(visitedArray[pos.x + 1][pos.y]);
        if (!ground.GetCollision(pos.x, pos.y - 1)) result.push(visitedArray[pos.x][pos.y - 1]);
        if (!ground.GetCollision(pos.x, pos.y + 1)) result.push(visitedArray[pos.x][pos.y + 1]);

        return result;
    }

    function Heurestic(pos0, pos1) {
        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    }

    var visitedArray = new Array<Array< { parent: any; visited: boolean; h: number; f: number; g: number; pos: Vector2D; }>>(100);
    for (var i = 0; i < 100; i++) {
        visitedArray[i] = new Array<{ parent: any; visited: boolean; h: number; f: number; g: number; pos: Vector2D; }>(100);
        for (var j = 0; j < 100; j++) {
            visitedArray[i][j] = { parent: null, visited: false, f: 0, h: 0, g: 0, pos: { x: i, y: j } }
        }
    }

    var closedSet = new Array< { parent: any; visited: boolean; g: number; pos: Vector2D; }>();
    visitedArray[start.x][start.y].h = Heurestic(start, goal);
    visitedArray[start.x][start.y].f = visitedArray[start.x][start.y].h;
    var openSet = [visitedArray[start.x][start.y]];


    while (openSet.length !== 0) {

        var lowInd = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowInd].f) { lowInd = i; }
        }


        var current = openSet[lowInd]


        if (current.h === 1) {
            var parent = current;
            var result = [];
            while (parent) {
                result.push(parent.pos);
                console.log(parent.pos);
                parent = parent.parent;
            }

            return result.reverse();

        }

        openSet.splice(lowInd, 1);
        closedSet.push(current);

        var Neighbours = GetNeighbours(current.pos);

        for (var i = 0; i < Neighbours.length; i++) {

            if (!Neighbours[i].visited || current.g + 1 < Neighbours[i].g) {
                Neighbours[i].parent = current;
                Neighbours[i].g = current.g + 1;
                Neighbours[i].h = Heurestic(Neighbours[i].pos, goal);
                Neighbours[i].f = Neighbours[i].g + Neighbours[i].h;

                if (!Neighbours[i].visited) {
                    openSet.push(Neighbours[i]);
                    Neighbours[i].visited = true;

                }

            }



        }

    }


    return ["not found"];
}
