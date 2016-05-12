var webpack = require("webpack");
module.exports = {

    entry: {
        app: ["./Client/Init.ts"]
    },
    resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    output: {
        path: __dirname + "/out/static",
        filename: "app.js",
        publicPath: "/"
    },
    devtool: 'source-map',
    hot:true,
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude:"node_modules"
            }
        ]
    }
};