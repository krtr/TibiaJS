import {Componenets} from "./BasicComponents";
import {World} from "./World";

export interface IComponent {
    Name: Componenets;
}

export interface ISystem {
    Process(world: World);
}