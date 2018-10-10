"use strict";

const open = require("open");
const nodemon = require("nodemon");

nodemon({
  cwd: "./out",
  ext: ".js, .css, .html",
  script: "Server.js",
}).on("restart", () => console.log("Restarted"));

open("http://localhost:2137");
