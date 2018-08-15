import fs from "fs";
import {CharacterList} from "./classes/CharacterList";
import {Ground} from "./classes/Ground";

export const config = LoadConfig();
export const characterList = new CharacterList();
export const ground = new Ground();


function LoadConfig() {
    var filebuff = fs.readFileSync("./data.json");
    return <Config>JSON.parse(filebuff.toString());
}