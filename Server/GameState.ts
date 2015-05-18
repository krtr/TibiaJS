import _CharacterList = require("./classes/CharacterList");
import _Ground = require("./classes/Ground");
import fs = require("fs");

export var config = LoadConfig();
export var CharacterList = new _CharacterList();
export var Ground = new _Ground();


function LoadConfig() {
    var filebuff = fs.readFileSync("./data.json");
    return <Config>JSON.parse(filebuff.toString());
}