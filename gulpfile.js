var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var open = require("open");

gulp.task("build client", function() {
    return gulp.src(["Client/**/*.ts", "resources/3rd/SpriteGL/bin/SpriteGL.d.ts", "Interchange/*.ts"])
        .pipe(typescript({ target: "ES6" }))
        .pipe(concat("client.js"))
        .pipe(gulp.dest("out/static"));
});

gulp.task("copy static client files", function() {
    return gulp.src(["Client/**/*.html", "Client/**/*.js", "resources/*.png", "resources/data.json",
        "resources/3rd/SpriteGL/bin/SpriteGL.js"])
        .pipe(gulp.dest("./out/static"));
});

gulp.task("build server", function() {
    return gulp.src(["Server/**/*.ts", "typings/**/*.d.ts", "Interchange/*.ts"])
        .pipe(typescript({ typescript: require("typescript"), module: "commonjs", target: "ES5" }))
        .pipe(gulp.dest("out"));
});

gulp.task("copy config", function() {
    return gulp.src(["resources/data.json"])
        .pipe(gulp.dest("out"));
})



gulp.task("build", gulp.series("build client", "copy static client files", "build server", "copy config"));



gulp.task("run", function () {
	nodemon({ script: "Server.js", cwd: "./out", ext: "html js css" })
		.on("restart", function () {
			console.log("Restarted")
		});

	open("http://localhost:2137");
});
