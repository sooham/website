var webpack = require("webpack");
var path    = require("path"),
    src     = path.resolve(__dirname, "src"),
    build   = path.resolve(__dirname, "build");

var NODE_ENV = process.env.NODE_ENV;

var isDev = NODE_ENV == "development";

var definePlugin = new webpack.DefinePlugin({
    __DEV__: isDev
});

var config = {
    entry: path.join(src, "app.js"),

    output: {
        path: build,
        publicPath: "/",
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader:"babel",
            include: src
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        definePlugin
    ],

    resolve: {
        extensions: ["", ".js", ".jsx", ".webpack.js"]
    },

    // generate source map for easy debugs
    devtool: "source-map",

    // webpack-dev-server config
    devServer: {
        colors: true,
        inline: true,
        contentBase: src,
        hot: true,
    }
};

module.exports = config;
