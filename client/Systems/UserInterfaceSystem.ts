import {ISystem} from "../Game";
import {Componenets, InputComponent} from "../BasicComponents";
import {config} from "../Init";
import {World} from "../World";

export class UserInterfaceSytem implements ISystem {
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