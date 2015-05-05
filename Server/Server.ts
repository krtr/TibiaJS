import express = require("express");
import http = require("http");
import socketio = require("socket.io");
var serveStatic = require('serve-static')
import PlayerList = require("./PlayerList");

var app = express();
var server = app.listen(2137);

export var io = socketio(server);
app.use(serveStatic("./static", { index: ["index.html"] }));

var playerList = new PlayerList();

io.on('connection', function (socket) {
	playerList.AddNew(socket);
});

setInterval(() => {
	playerList.ForEach((plr) => {
		io.sockets.emit("CharacterHit", { ID: plr.GetID(), Dmg: 10 });
	});
}, 1000);