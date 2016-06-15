// @flow

// config file for the production
// express server
var webpack = require("webpack");

var fs = require("fs");
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

// css extraction (necessary for isomorphic behaviour)
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: path.join(__dirname, "server.js"),

    output: {
        path: __dirname,
        filename: "server.bundle.js"
    },

    // the built bundles are targeted towards
    // node.js, as we will be doing server side
    // rendering of React components
    target: "node",

    externals: fs.readdirSync(modules)
        .concat(["react-dom/server", "react/addons"]).reduce(
        (ext, mod) => {
            ext[mod] = "commonjs " + mod;
            return ext;
        }, {}),

    node: {
        __filename: true,
        __dirname: true
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader:"babel",
                exclude: /node_modules/
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

    // add .jsx extension for JSX files
    resolve: {
        // some aliases for easy requires in server.js
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

    plugins: (isDev ? [] : []).concat([devPlugin, new ExtractTextPlugin("public/styles/[name].css")]),

    // postcss config
    // it is possible to modify these postcss Processors
    // through the object argument.
    postcss: [
        require("autoprefixer")({}),
        require("cssnano")({}),
        require("precss")({})
    ]
};

module.exports = config;
