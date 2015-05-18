import GameState = require("./GameState");
import Server = require("./Server");
import Player = require("./classes/Player");

function OnConnection(socket: SocketIO.Socket) {
    var plr = new Player(socket);
    plr.Sync();
    socket.emit("NewCharacters", GameState.CharacterList.GetAllSyncData());
    plr.SelfAnnouce();

    socket.on("PlayerMove", function (data: MoveData) {
        plr.Move(data);
    });

    socket.on("PlayerMessage", function (data: { Msg: string }) {
        console.log(data.Msg);
        Server.io.sockets.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
    });

    socket.on("PlayerTarget", function (data: { ID; IsTargeting: boolean }) {
        var plr = GameState.CharacterList.GetByID(socket.id);
      
        if (plr) {
            if (data.IsTargeting) {
                var targetChar = GameState.CharacterList.GetByID(data.ID);
                if (!targetChar) return;
                plr.Target(targetChar);
            } else {
                plr.Untarget();
            }
            
        }
    });

    socket.on("disconnect", () => {
        var char = GameState.CharacterList.RemoveByID(socket.id);
        if (char) {
            char.Dispose();
            console.log("DISPOSED", socket.id);
        }
    });

    GameState.CharacterList.AddNewPlayer(plr);
}


export = OnConnection;