const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./app/views/index.ts",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules|src/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Aula 06",
            template: "app/views/custom.html",
        }),
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        hot: true,
    },
};
