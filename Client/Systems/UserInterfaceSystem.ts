import {config} from "../Init";
import {Componenets, InputComponent} from "../BasicComponents";
import {World} from "../World";
import {ISystem} from "../Game";

export default class UserInterfaceSytem implements ISystem {
    private Level = document.getElementById("Lvl");
    private Exp = document.getElementById("Exp");
    private LvlProgressBar = <HTMLProgressElement>document.getElementById("LevelProgressBar");

    Process(world: World) {
        for (var i = 0; i < world.entityList.length; i++) {
            if ((world.entityList[i].ComponentSygnature & Componenets.Input) === Componenets.Input) {
                var inputComponent = <InputComponent> world.entityList[i].ComponentList[Componenets.Input];
                this.Level.innerHTML = inputComponent.Level.toString();
                this.Exp.innerHTML = inputComponent.Experience.toString() + "/" + config.Player.LvlExp[inputComponent.Level].toString();
                this.LvlProgressBar.value = inputComponent.Experience / config.Player.LvlExp[inputComponent.Level] * 100;
               
            }
        }
    }
}