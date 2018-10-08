/// <reference path="../resources/index.d.ts" />

import {OnConnection} from "./OnConnect";
import express from "express";
import socketio from "socket.io";
import serveStatic from "serve-static";
import * as ServerLoop from "./ServerLoop";

var app = express();
var server = app.listen(2137);


export var socketServer = socketio(server);


ServerLoop.Start();
app.use(serveStatic("./static", { index: ["index.html"] }));
socketServer.on('connection', OnConnection);