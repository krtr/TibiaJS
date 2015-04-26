import express = require("express");
import http = require("http");
var app = express();
var server = app.listen(2137);
import socketio = require("socket.io");
var serveStatic = require('serve-static')
import PlayerList = require("./PlayerList");
var io = socketio(server);
app.use(serveStatic("./static", { index: ["index.html"] }));

var playerList = new PlayerList();
io.on('connection', function (socket) {
	playerList.AddNew(socket);
});

