var fs = require("fs");

import BinaryFileReader = require("./BinaryFileReader");

function readDatFile(filePath:string) {
    var mapBuffer = fs.readFileSync(filePath);

    var fileReader = new BinaryFileReader(mapBuffer, 0);
    var items = fileReader.readUInt16();
    var creature = fileReader.readUInt16();
    var effects = fileReader.readUInt16();
    var missles = fileReader.readUInt16();

    var things = [];
    for (var i = 100; i < items; i++) {
        var obj = {flags: [], width: 0, height: 0, layers: 0, xDiv: 0, yDiv: 0, zDiv: 0, frames: 0, sprites: []};
        var currFlag = -1;
        while (currFlag < 255) {
            currFlag = fileReader.readUInt8();
        }


        obj.width = fileReader.readUInt8();
        obj.height = fileReader.readUInt8();
        if ((obj.width > 1) || (obj.height > 1))
            fileReader.skip(1);

        obj.layers = fileReader.readUInt8();
        obj.xDiv = fileReader.readUInt8();
        obj.yDiv = fileReader.readUInt8();
        obj.zDiv = fileReader.readUInt8();


        obj.frames = fileReader.readUInt8();


        var spriteCount = obj.width * obj.height * obj.layers * obj.xDiv * obj.yDiv * obj.zDiv * obj.frames

        for (var j = 0; j < spriteCount; j++) {
            obj.sprites.push(fileReader.readUInt16());
        }

        things.push(obj);
    }

    return things;
}

export = readDatFile;