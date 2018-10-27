import {CharacterList} from "./classes/CharacterList";
import {Ground} from "./classes/Ground";
import data from "../resources/data.json";
import {Config} from "../Interchange/DataStructures";

export const config: Config = data;
export const characterList = new CharacterList();
export const ground = new Ground();
