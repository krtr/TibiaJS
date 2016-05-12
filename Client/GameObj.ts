import {IComponent} from "./Game";
export default class GameObj {
    ID;
    ComponentSygnature = 0;
    ComponentList: IComponent[];
    constructor() {
        this.ComponentList = <any>{};
    }

    AddComponent(component: IComponent) {
        this.ComponentList[component.Name] = component;
        this.ComponentSygnature += component.Name;
    }
}