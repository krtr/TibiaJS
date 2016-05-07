﻿import GameState = require("./GameState");
import Server = require("./Server");
import Player = require("./classes/Player");


function SendMapUpdate(socket, x, y, width, height) {
    var groundStrip = GameState.Map.getGroundRect(x, y, width, height);
    var decorationStrip = GameState.Map.getDecorationRect(x, y, width, height);

    var buffer = new Int16Array(width * height * 2 + 4);
    buffer[0] = x;
    buffer[1] = y;
    buffer[2] = width;
    buffer[3] = height;

    for (var i = 0; i < groundStrip.length; i++) {
        buffer[i + 4] = groundStrip[i];
    }

    for (var i = 0; i < groundStrip.length; i++) {
        buffer[i + 4 + groundStrip.length] = decorationStrip[i];
    }

    socket.emit("MapUpdate", buffer);
}


function OnConnection(socket:SocketIO.Socket) {
    var plr = new Player(socket);
    plr.Sync();
    socket.emit("NewCharacters", GameState.CharacterList.GetAllSyncData());
    plr.SelfAnnouce();

    var plrPos = plr.GetJSON().Position;
    SendMapUpdate(socket, plrPos.x - 9, plrPos.y - 9, 20, 20);

    socket.on("PlayerMove", function (data:MoveData) {
        plr.Move(data);
        var x = 0, y = 0, width = 0, height = 0;
        switch (data.Rot) {
            case Rotation.Right:
                x = data.Pos.x + 9;
                y = data.Pos.y - 9;
                width = 1;
                height = 20;
                break;
            case Rotation.Left:
                x = data.Pos.x - 9;
                y = data.Pos.y - 9;
                width = 1;
                height = 20;
                break;
            case Rotation.Top:
                x = data.Pos.x - 9;
                y = data.Pos.y - 9;
                width = 20;
                height = 1;
                break;
            case Rotation.Down:
                x = data.Pos.x - 9;
                y = data.Pos.y + 9;
                width = 20;
                height = 1;
                break;
        }
        SendMapUpdate(socket, x, y, width, height);
    });

    socket.on("PlayerMessage", function (data:{ Msg:string }) {
        console.log(data.Msg);
        Server.io.sockets.emit("CharacterMessage", {Msg: data.Msg, ID: socket.id});
    });

    socket.on("PlayerTarget", function (data:{ ID; IsTargeting:boolean }) {
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