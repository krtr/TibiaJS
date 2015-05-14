class World {
    entityList = new Array<GameObj>();
    eventList = new Array<GameEvent>();
    FPS = 1;

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

    PushEvent(subject: GameObj, eventType: Events, Payload = null) {
        this.eventList.push(new GameEvent(subject, eventType, Payload));
    }

    GetEventByType(type: Events): GameEvent[] {
        var result = [];
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].EventType === type)
                result.push(this.eventList[i]);
        }
        return result;
    }

    ClearEvets() {
        this.eventList = [];
    }

    RemoveEntity(ID) {
        for (var i = 0; i < this.entityList.length; i++) {
            if (this.entityList[i].ID === ID) {
                this.entityList.splice(i, 1);
                return;
            }
        }
    }

}


enum Events { PlayerMove };
class GameEvent {
    EventType: Events;
    Subject: GameObj;
    Payload;

    constructor(subject: GameObj, eventType: Events, Payload = null) {
        this.Subject = subject;
        this.EventType = eventType;
        this.Payload = Payload;
    }
}