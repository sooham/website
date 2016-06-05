import React from "react";
import Express from "express";

import path from "path";

import { match, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";

// TODO: import routes
// TODO: This templating algorithm doesn't suffice
// for my purposes in terms of flexibility and
// resource management i.e CSS modules

var app = Express();

app.use(express.static(path.join(__dirname, "public")));

// React render page utility function
function renderPage(appHtml) {
    return  `
            <!doctype html>
            <html>
                <meta charset="utf-8"/>
                <title>Sooham Rafiz</title>
                <div id="app">${appHtml}</div>
                <script src="/home.bundle.js"></script>
                <script src="/admin.bundle.js"></script>
            `
}
const PORT = process.env.PORT || 8080;
app.listen(PORT,
    () => console.log(`Express Production Server running at localhost:${PORT}`);
);

