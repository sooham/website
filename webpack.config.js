// @flow

// config file for the development build
// using the webpack-dev-server


// TODO: future issues to combat
// index.html files in /public folder should be
// placed in src using html-loader

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


// css modules naming scheme
var cssModulesNames = (
    isDev ? "[path][name]__[local]__" : "") + "[hash:base64:5]";

// css extraction
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: path.join(src, "index.js"),

    output: {
        path: dest,
        publicPath: "/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader:"babel",
                include: src
            },
            {
                test: /\.module\.css$/,
                include: src,
                loader: ExtractTextPlugin.extract(
                    "style",
                    "css-loader?modules&localIdentName=" + cssModulesNames,
                    "postcss"
                )
            },
            {
                test: /^[^\.]*\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style",
                    "css-loader?modules&localIdentName=" + cssModulesNames,
                    "postcss"
                )
            },
            {
                test: /\.css$/,
                include: modules,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.(png|ico|tiff|pdf)$/,
                include: src,
                loader: "url?limit=10000"
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
    ]).concat([devPlugin, new ExtractTextPlugin("styles/[name].css")]),


    // add .jsx extension for JSX files
    resolve: {
        alias: {
            components: path.join(src, "components"),
            containers: path.join(src, "containers"),
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
    },

    // postcss config
    // it is possible to modify these postcss Processors
    // through the object argument.
    postcss: [
        require("autoprefixer")({}),
        require("cssnano")({}),
        require("precss")({})
    ],

};

module.exports = config;
