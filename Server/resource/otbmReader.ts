var fs = require("fs");
import BinaryFileReader = require("./BinaryFileReader");



interface Map {
    width: number;
    height: number;
    infoString: string;
    description: string;
    spawnFileName: string;
    houseFileName: string;
    tiles: Array<any>
}

function readOtbm(filePath:string):Map {

    var mapObj = {
        editorVersion: 0,
        width: 0,
        height: 0,
        infoString: "",
        description: "",
        spawnFileName: "",
        houseFileName: "",
        tiles: new Array(256*256)
    };

    var mapBuffer = fs.readFileSync(filePath);
    var fileReader = new BinaryFileReader(mapBuffer, 0);
    fileReader.skip(6);
    mapObj.editorVersion = fileReader.readUInt32()
    mapObj.width = fileReader.readUInt16();
    mapObj.height = fileReader.readUInt16();
    fileReader.skip(8);
    fileReader.startNode();
    fileReader.skip(1);
    mapObj.infoString = fileReader.readString();
    fileReader.skip(1);
    mapObj.description = fileReader.readString();
    fileReader.skip(1);
    mapObj.spawnFileName = fileReader.readString();
    fileReader.skip(1);
    mapObj.houseFileName = fileReader.readString();

    const mapChunkNode = 4;
    const mapTileNode = 5;
    const mapThinghsNode = 6;
    const attrItem = 9;

    while (!fileReader.isNextNodeEnd()) {
        fileReader.startNode();
        if (fileReader.getTopNode() === mapChunkNode) {
            var mapChunk = {x: 0, y: 0, z: 0, tiles: []}
            mapChunk.x = fileReader.readUInt16();
            mapChunk.y = fileReader.readUInt16();
            mapChunk.z = fileReader.readUInt8();

            if (mapChunk.x > mapObj.width || mapChunk.y > mapObj.height)
                break;


            while (!fileReader.isNextNodeEnd()) {
                fileReader.startNode();
                if (fileReader.getTopNode() === mapTileNode) {
                    var tileObj = {x: 0, y: 0, tileType: 0, groundTileID: 0, things: []};
                    tileObj.x = fileReader.readUInt8();
                    tileObj.y = fileReader.readUInt8();
                    tileObj.tileType = fileReader.readUInt8()
                    if (tileObj.tileType === attrItem)
                        tileObj.groundTileID = fileReader.readUInt16();
                    else {
                        fileReader.skipUntilNode(mapTileNode);
                        continue;
                    }
                }

                if (!fileReader.isNextNodeStart() && !fileReader.isNextNodeEnd())
                    console.log("WTF", fileReader.readPos, fileReader.readUInt8());

                if (tileObj.tileType === attrItem)
                    while (fileReader.isNextNodeStart()) {
                        fileReader.startNode();
                        if (fileReader.getTopNode() === mapThinghsNode) {
                            var thing = fileReader.readUInt16();
                            tileObj.things.push(thing);
                        }
                        fileReader.endNode();
                    }
                fileReader.endNode();
                var tileX = tileObj.x + mapChunk.x;
                var tileY = tileObj.y + mapChunk.y;

                var index = tileY * mapObj.height + tileX;
                mapObj.tiles[index] = [tileObj.groundTileID];
                mapObj.tiles[index].push.apply(mapObj.tiles[index], tileObj.things);
            }
        }
        fileReader.endNode();
    }

    return mapObj;
}

export = readOtbm;