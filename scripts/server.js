var Router = require("router");
var http = require("http");
var querystring = require("querystring");
var tls = require("tls");
var url = require("url");

/* Respond with statusCode, data with type and headers
 *
 * @response http.ServerResponse
 * @statusCode int
 * @body String
 * @type String
 * @headers Object
 */
function respond(response, statusCode, data, type, headers) {
    var defaultHeader = {
        "Content-Length": data.length,
        "Content-Type": type || "text/html"
    };
    if (headers)
        Object.keys(headers).forEach(function (key) {defaultHeader[key] = headers[key];
        });
        
    response.writeHead(statusCode, defaultHeader);
    response.write(body);
    response.end();
}

/* Respond with JSON data with statusCode and headers */
function respondAsJSON(response, statusCode, data, headers) {
    respond(response, statusCode, JSON.stringify(data), "application/json", headers);
}

/* Scrape key value pairs from request body 
 * @request http.IncomingMessage
 */
function getKeyValuePairsFromStream(request) {
    var body = "";
    request.on('error') = function () {
        // what to do here?
        console.error("'error' occurred at getKeyValuePairsFromStream");
    }

    request.on("data") = function (chunk) {
        body += chunk;
    }
    request.on("end") = function () {
        // process and return the key value pairs here
        return querystring.parse(body);
    }
}

// HTTP schema
// GET / redirects to /blog (for now)
// GET /blog return the JSON objects for the blog
// POST /blog posts a new blog post to blog
// GET /projects return the JSON objects for the project
// GET /admin return the admin login page
// POST /admin username and password to login

Router.add("GET", /^\/$/, rootHandler);
Router.add("GET", /^\/admin\/?$/, getAdminHandler);
Router.add("GET", /^\/blog\/([^\/]+)/?$/, getBlogPostHandler);
Router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
Router.add("GET", /^\/projects\/?$/, projectsHandler);
Router.add("POST", /^\/admin\/?$/, loginHandler);
Router.add("POST", /^\/blog\/([^\/]+)/?$/, postBlogPostHandler);

/* Handles the / */
function rootHandler(request, response) {
    // do a redirect to /blog
    respond(response, 302, "", null, {"Location": "/blog"});
}

/* Handles the GET /blog */
function getBlogPostsHandler(request, response) {
    // get JSON posts from the database
    var blog_posts = GetPostFromMongo();
    respondAsJSON(response, 200, blog_posts);
}

/* Handles the get /blog/post-name */
function getBlogPostHandler(request, response) {
    // get JSON posts from the database
    var post_name = arguments[2];
    var blog_post = GetPostFromMongo(post_name);
    respondAsJSON(response, 200, blog_post);
}

/* Handles the /projects */
function projectsHandler(request, response) {
    var project_posts = GetProjectPostsFromMongo();
    respondAsJSON(response, 200, project_posts);
}

function getAdminHandler(request, response) {
    // make login system
}

function loginHandler(request, response) {
    // make login system
}

// 401 - unauthorized
// 400 - Bad Request
// 404 - Forbidden - request is valid but server refuses to respond
// 405 - method not allowed

var server = http.createServer(function (request, response) {
    if (!Router.route(request, response)) {
        // send a 404
        respond(response, 404, http.STATUS_CODES[404],"text/plain");
    }
    response.end();
})

server.on('clientError', function (err, socket) {
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
})
server.listen(8080, "hostname");
