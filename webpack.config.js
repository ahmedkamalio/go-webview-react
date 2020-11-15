const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const NoEmitPlugin = require("no-emit-webpack-plugin");

module.exports = {
    entry: {
        main: path.join(__dirname, "src/fe/main.tsx")
    },
    target: "web",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.join(__dirname, "dist/fe"),
        filename: "ui.js"
    },
    module: {
        rules: [
            {
                test: /\.ts?(x)$/,
                include: path.join(__dirname, "src/fe"),
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/fe"),
        port: 5000
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, "src/fe/index.html")
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
        new NoEmitPlugin("ui.js")
    ]
};
