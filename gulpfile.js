var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var open = require("open");
var runSequence = require("run-sequence");

gulp.task("build", function () {
	gulp.src(["./Client/**/*.ts", "./typings/**/*.ts", "./resources/3rd/SpriteGL/bin/SpriteGL.d.ts"])
		.pipe(typescript({ sortOutput: true, target: "ES5" }))
		.pipe(concat("client.js"))
		.pipe(gulp.dest("./out/static"));

	gulp.src(["./Client/**/*.html", "./Client/**/*.js", "./resources/*.png", "./resources/*.json", "./resources/3rd/SpriteGL/bin/SpriteGL.js"])
		.pipe(gulp.dest("./out/static"));

	gulp.src(["./Server/**/*.ts", "./typings/**/*.ts"])
		.pipe(typescript({ module: "commonjs", target: "ES5" }))
		.pipe(gulp.dest("./out"));
});

gulp.task("run", function () {
	nodemon({ script: "app.js", cwd: "./out", ext: "html js css", ignore: ["ignored.js"] })
		.on("restart", function () {
    		console.log("Restarted")
		})

	open("http://localhost:2137");
});
