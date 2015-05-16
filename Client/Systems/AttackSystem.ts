class AttackSystem implements ISystem {
    RequiredSygnature = Componenets.Health;

    Process(world: World) {
        for (var i = 0; i < world.entityList.length; i++) {
            if ((world.entityList[i].ComponentSygnature & this.RequiredSygnature) !== this.RequiredSygnature) continue;

        }
    }
}