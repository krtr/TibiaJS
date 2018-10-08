var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var open = require("open");
var webpack = require('webpack-stream');

gulp.task("build client", function() {
    return gulp.src("./client/Init.ts")
        .pipe(webpack(require('./client/webpack.config.js')))
        .pipe(gulp.dest("out/static"));
});

gulp.task("copy static client files", function() {
    return gulp.src(["client/**/*.html", "client/**/*.js", "resources/*.png", "resources/data.json",
        "resources/3rd/SpriteGL/bin/SpriteGL.js"])
        .pipe(gulp.dest("./out/static"));
});

gulp.task("build", gulp.series("build client", "copy static client files"));

gulp.task("run", function () {
    nodemon({ script: "Server.js", cwd: "./out", ext: "html js css" })
        .on("restart", function () {
            console.log("Restarted")
        });

    open("http://localhost:2137");
});
