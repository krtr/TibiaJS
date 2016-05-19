﻿import _CharacterList = require("./classes/CharacterList");
import _Ground = require("./classes/Ground");
import fs = require("fs");
import _Network = require("./Network");
import otbmReader = require("./resource/otbmReader");

class _Map {
    map: Array<Array<number>>;
    width: number;
    height: number;

    constructor(path:string) {
        var mapObj = otbmReader("./startMap.otbm");
        this.map = mapObj.tiles;
        this.width = mapObj.width;
        this.height = mapObj.height;
    }
    
    public getFloorRect(startX, startY, width, height) {
        var resultArray = [];
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var currX = startX + x;
                var currY = startY + y;
                resultArray.push(this.map[currY * this.width + currX]);
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

