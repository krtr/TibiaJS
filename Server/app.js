var express = require("express");
var app = express();
var server = require('http').Server(app);
var socketio = require("socket.io");
var serveStatic = require('serve-static');
var io = socketio(server);
app.use(serveStatic("./static", { index: ["index.html"] }));
app.listen(2137);
io.on('connection', function (socket) {
});
