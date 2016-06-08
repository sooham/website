// @flow

// config file for the production build using the
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

var config = {
    entry: path.resolve("server.js"),

    output: {
        filename: "server.bundle.js"
    },

    // the built bundles are targeted towards
    // node.js, as we will be doing server side
    // rendering of React components
    target: "node",

    externals: fs.readdirSync(modules).reduce(
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
                include: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },

    // add .jsx extension for JSX files
    resolve: {
        // some aliases for easy requires in server.js
        alias: {
            components: path.join(src, "components"),
            utils: path.join(src, "utils"),
            routes: path.join(src, "routes")
        },
        extensions: ["", ".js", ".jsx", ".webpack.js"]
    },

    plugins: [devPlugin]
};

module.exports = config;
