/// <binding />
var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var ignore = require('gulp-ignore');
var open = require("open");
var runSequence = require("run-sequence");

gulp.task("build", function () {
	gulp.src(["Client/**/*.ts", "typings/socket.io-client/socket.io-client.d.ts", "resources/3rd/SpriteGL/bin/SpriteGL.d.ts", "Interchange/*.ts",
	 "typings/preloadjs/preloadjs.d.ts"])
		.pipe(typescript({ sortOutput: true, target: "ES6" }))
		.pipe(concat("client.js"))
		.pipe(gulp.dest("out/static"));

	gulp.src(["Client/**/*.html", "Client/**/*.js", "resources/*.png", "resources/data.json",
		"resources/3rd/SpriteGL/bin/SpriteGL.js", "resources/3rd/PreloadJS/lib/preloadjs-0.6.0.min.js"])
		.pipe(gulp.dest("./out/static"));

	gulp.src(["!typings/socket.io-client/socket.io-client.d.ts", "Server/**/*.ts", "typings/**/*.d.ts", "Interchange/*.ts"])
		.pipe(typescript({ typescript: require("typescript"), module: "commonjs", target: "ES5" }))
		.pipe(gulp.dest("out"));

	gulp.src(["resources/data.json"])
	.pipe(gulp.dest("out"));

});

gulp.task("run", function () {
	nodemon({ script: "Server.js", cwd: "./out", ext: "html js css" })
		.on("restart", function () {
			console.log("Restarted")
		});

	open("http://localhost:2137");
});
