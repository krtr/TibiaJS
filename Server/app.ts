var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic("./static", { index: ["index.html"] }));
app.listen(2137);
