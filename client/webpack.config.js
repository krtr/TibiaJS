const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    mode: "development",
    output: {
        filename: "client.js"
    },
    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {configFileName: "./client/tsconfig.json" }
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};