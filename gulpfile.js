/// <binding />
var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var ignore = require('gulp-ignore');
var open = require("open");
var runSequence = require("run-sequence");
gulp.task("build", function () {
	gulp.src(["Client/**/*.html", "resources/*.png", "resources/config.json",
		"resources/3rd/SpriteGL/bin/SpriteGL.js"])
		.pipe(gulp.dest("./out/static"));

	gulp.src(["!typings/socket.io-client/socket.io-client.d.ts", "Server/**/*.ts", "typings/**/*.d.ts", "Interchange/*.ts"])
		.pipe(typescript({ typescript: require("typescript"), module: "commonjs", target: "ES5" }))
		.pipe(gulp.dest("out"));

	gulp.src(["resources/config.json", "resources/fullmap.json"])
	.pipe(gulp.dest("out"));

});

gulp.task("run", function () {
	nodemon({ script: "Server.js", cwd: "./out", ext: "html js css" })
		.on("restart", function () {
			console.log("Restarted")
		})

	open("http://localhost:2137");
});
