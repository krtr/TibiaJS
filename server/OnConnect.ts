import {Player} from "./classes/Player";
import {characterList} from "./GameState";
import {socketServer} from "./Server";



export function OnConnection(socket: SocketIO.Socket) {
    var plr = new Player(socket);
    plr.Sync();
    socket.emit("NewCharacters", characterList.GetAllSyncData());
    plr.SelfAnnouce();

    socket.on("PlayerMove", function (data: MoveData) {
        plr.Move(data);
    });

    socket.on("PlayerMessage", function (data: { Msg: string }) {
        console.log(data.Msg);
        socketServer.sockets.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
    });

    socket.on("PlayerTarget", function (data: { ID; IsTargeting: boolean }) {
        var plr = characterList.GetByID(socket.id);
      
        if (plr) {
            if (data.IsTargeting) {
                var targetChar = characterList.GetByID(data.ID);
                if (!targetChar) return;
                plr.Target(targetChar);
            } else {
                plr.Untarget();
            }
            
        }
    });

    socket.on("disconnect", () => {
        var char = characterList.RemoveByID(socket.id);
        if (char) {
            char.Dispose();
            console.log("DISPOSED", socket.id);
        }
    });

    characterList.AddNewPlayer(plr);
}


