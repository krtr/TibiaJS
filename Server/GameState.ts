﻿import _CharacterList = require("./classes/CharacterList");
import _Ground = require("./classes/Ground");
import fs = require("fs");
import _Network = require("./Network");


class _Map {
    Decorations:Int16Array;
    SmallDecorations:Int16Array;
    Collision:Int16Array;
    Floor:Int16Array;

    constructor(path:string) {
        var rawMap = JSON.parse(fs.readFileSync(path).toString());


        for (var i = 0; i < rawMap.layers.length; i++) {
            if (rawMap.layers[i].name === "ground") {
                this.Floor = new Int16Array(rawMap.layers[i].data);
            }

            if (rawMap.layers[i].name === "decorations") {
                this.Decorations = new Int16Array(rawMap.layers[i].data);
            }

            if (rawMap.layers[i].name === "small decorations") {
                this.SmallDecorations = new Int16Array(rawMap.layers[i].data);
            }

            if (rawMap.layers[i].name === "collision") {
                this.Collision = new Int16Array(rawMap.layers[i].data);
            }
        }
    }


    public getGroundRect(startX, startY, width, height) {
        return this._getMapRect("Floor", startX, startY, width, height)
    }

    public getDecorationRect(startX, startY, width, height) {
        return this._getMapRect("Decorations", startX, startY, width, height)
    }

   private _getMapRect(layerName:string, startX, startY, width, height) {
        var resultArray = [];
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) { 
                var currX = startX + x;
                var currY = startY + y;
                resultArray.push(this[layerName][currY * config.MapWidth + currX]);
            }
        }

        return resultArray;
    }


    public getFloorRect(startX, startY, width, height) {
        var resultArray = [];
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var currX = startX + x;
                var currY = startY + y;
                resultArray.push(this.Floor[currY * config.MapWidth + currX]);
            }
        }

        return resultArray;
    }
}


export var config = LoadConfig();
export var CharacterList = new _CharacterList();
export var Ground = new _Ground();
export var Network = new _Network();
export var Map = new _Map("./fullmap.json");

function LoadConfig() {
    var filebuff = fs.readFileSync("./config.json");
    return <Config>JSON.parse(filebuff.toString());
}

