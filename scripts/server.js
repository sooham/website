var http = require("http");
var url = require("url");
var Router = require("router");

// HTTP schema
// GET / redirects to /blog (for now)
// GET /blog return the JSON objects for the blog
// GET /projects return the JSON objects for the project
// GET /admin return the admin login page
// POST /admin username and password to login

Router.add(/^\/$/, rootHandler);
Router.add(/^\/blog(?:\/|\/([^\/]+))?$/, blogHandler);
Router.add(/^\/projects/?$/, projectsHandler);
Router.add(/^\/admin/?$/, adminHandler);

/* Respond with statusCode */
function respond(response, statusCode, body, type, headers) {
    var defaultHeader = {
        "Content-Length": body.length,
        "Content-Type": type || "text/html"
    }
    if (headers)
        Object.keys(headers).forEach(function (key) {defaultHeader[key] = headers[key];})
        
    response.writeHead(statusCode, defaultHeader);
    response.write(body);
    response.end();
}

function rootHandler(request, response) {
}

function blogHandler(request, response) {

}

function projectsHandler(request, response) {

}

function adminHandler(request, response) {

}


var server = http.createServer(function (request, response) {
    var isRouted = Router.route(request, response);
    if (!isRouted) {
        // send a 404
    }
    response.end();
})

server.on('clientError', function (err, socket) {
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
})
server.listen(8080);
