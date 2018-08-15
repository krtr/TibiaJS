/// <reference path="../Interchange/DataStructures.ts"/>

import {OnConnection} from "./OnConnect";
import express = require("express");
import socketio = require("socket.io");
var serveStatic = require('serve-static');
import ServerLoop = require("./ServerLoop");
var app = express();
var server = app.listen(2137);


export var socketServer = socketio(server);


ServerLoop.Start();
app.use(serveStatic("./static", { index: ["index.html"] }));
socketServer.on('connection', OnConnection);