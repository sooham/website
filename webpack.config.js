// @flow

// config file for the development build
// using the webpack-dev-server

var webpack = require("webpack");

var path    = require("path"),
    src     = path.join(__dirname, "src"),
    dest    = path.join(__dirname, "public"),
    modules = path.join(__dirname, "node_modules");

var NODE_ENV = process.env.NODE_ENV;
var isDev = NODE_ENV == "development";

// define variable __DEV__ to allow for development
// mode specific code execution
var devPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(isDev)
});

var config = {
    // multiple entry points
    // home -> portfolio {home,blog,projects,demos,resume}
    // admin -> editor {editor}
    entry: {
        home: path.join(src, "home.js"),
        admin: path.join(src, "admin.js")
    },

    output: {
        path: dest,
        publicPath: "/",
        filename: "[name].bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader:"babel",
                include: src
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },

    // TODO: make sure all standard plugins for
    // prodcution are used i.e minification etc
    plugins: (isDev ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]).concat([devPlugin]),


    // add .jsx extension for JSX files
    resolve: {
        alias: {
            components: path.join(src, "components"),
            styles: path.join(src, "styles"),
            utils: path.join(src, "utils"),
            routes: path.join(src, "routes"),
            modules: modules
        },
        extensions: ["", ".js", ".jsx", ".webpack.js"]
    },

    // generate source map for easy debugs
    devtool: "source-map",

    // webpack-dev-server configuration
    devServer: {
        colors: true,
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: dest
    }
};

module.exports = config;
