import express = require("express");
import http = require("http");
import socketio = require("socket.io");
var serveStatic = require('serve-static')
import OnConnection = require("./OnConnect");
import ServerLoop = require("./ServerLoop");
var app = express();
var server = app.listen(2137);

export var io = socketio(server);
ServerLoop.Start();
app.use(serveStatic("./static", { index: ["index.html"] }));
io.on('connection', OnConnection);

