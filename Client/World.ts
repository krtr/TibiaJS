class World {
    entityList = new Array<GameObj>();

    Add(gameObj: GameObj) {
        if (!this.GetByID(gameObj.ID)) {
            this.entityList.push(gameObj);
        }
    }

    GetByID(ID) {
        for (var i = 0; i < this.entityList.length; i++) {
            if (this.entityList[i].ID === ID) return this.entityList[i];
        }
        return null;
    }

}