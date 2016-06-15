import React from "react";
import Express from "express";

import path from "path";

import { match, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";

import indexRoutes from "routes/indexRoutes";

const app = Express();


// serve all static content in public/ directory
app.use(Express.static(path.join(__dirname, "public")));

// send all requests to SPA's index.html
// so that browserHistory works
app.get("*", function (req, res) {
    // match routes to req.url
    match({routes: indexRoutes, location: req.url}, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            const appHtml = renderToString(<RouterContext {...props} />);
            res.status(200).send(renderPage(appHtml));
        } else {
            // 404
            res.status(404).send("Not Found");
        }
    });
});


// place generated html into template
// TODO: use a proper ts / jade / ejs template pls
function renderPage(appHtml) {
    return  `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Sooham_Rafiz</title>
                <meta name="description" content="Sooham Rafiz's personal website." />
                <link rel="stylesheet" type="text/css" href="/styles/home.css" />
                <link rel="stylesheet" type="text/css" href="/styles/main.css" />
                <link href='https://fonts.googleapis.com/css?family=Inconsolata|VT323|Lato|Ubuntu:400italic' rel='stylesheet' type='text/css'>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>

            <body>
                <div id="app">${appHtml}</div>
                <script src="/bundle.js" type="text/javascript"></script>
                <script src="https://use.fontawesome.com/ba2386bece.js" type="text/javascript" async></script>
            </body>
        </html>
            `;
}


const PORT = process.env.PORT || 8080;
app.listen(PORT,
    () => console.log(`Express Production Server running at localhost:${PORT}`)
);

