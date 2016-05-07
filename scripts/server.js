var Router = require("./router");
var http = require("http");
var querystring = require("querystring");
var tls = require("tls"); // do something with the TLS
var url = require("url");

/* Respond with statusCode, data with type and headers
 *
 * @response http.ServerResponse
 * @statusCode int
 * @body String
 * @type String
 * @headers Object
 */
function respond(response, statusCode, data, type, header) {
    console.error("statusCode: " + statusCode);
    console.error("data: " + data.toString());
    var defaultHeader = {
        "Content-Length": data.length,
        "Content-Type": type || "text/html"
    };
    if (header)
        Object.keys(header).forEach(function (key) {defaultHeader[key] = header[key];
        });

    console.error("type: " + (type || "text/html"));
    console.error("headers: " + JSON.stringify(defaultHeader));
        
    response.writeHead(statusCode, defaultHeader);
    response.write(data);
    response.end();
}

/* Respond with JSON data with statusCode and headers */
function respondAsJSON(response, statusCode, data, headers) {
    respond(response, statusCode, JSON.stringify(data), "application/json", headers);
}

/* Scrape key value pairs from request body 
 * @request http.IncomingMessage and calls callback on body
 */
function getKeyValuePairsFromStream(request, callback) {
    var body = "";

    request.on("error", function (error) {
        console.log("error event found");
        // send a response through error
        callback(error);
    });

    request.on("data", function (data) {
        body += data;

        // Too much POSTed data
        if (body.length > 1e6)      // TODO: Why?
            request.connection.destroy();
    });

    request.on("end", function () {
        var result, error;
        try {
            result = querystring.parse(body);
        } catch (e) {error = e;}
        callback(error, result);
    });
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
Router.add("GET", /^\/blog\/([^\/]+)\/?$/, getBlogPostHandler);
Router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
Router.add("GET", /^\/projects\/?$/, projectsHandler);
Router.add("POST", /^\/admin\/?$/, loginHandler);
Router.add("POST", /^\/blog\/?$/, postBlogPostHandler);

var db = Object.create(null); // TODO: delete and replace with mongo
db.blogPosts = Object.create(null);
db.projectPosts = Object.create(null);

/* Handles the / */
function rootHandler(request, response) {
    // do a redirect to /blog
    respond(response, 302, "", "text/plain", {"Location": "/blog"});
}

/* Handles the GET /blog */
function getBlogPostsHandler(request, response) {
    // get JSON posts from the database
    var blogPosts = db.blogPosts;
    respondAsJSON(response, 200, blogPosts);
}

/* Handles the get /blog/post-name */
function getBlogPostHandler(request, response) {
    // get JSON posts from the database
    var postTitle = arguments[2];

    var blogPost = db.blogPosts[postTitle];
    if (blogPost)
        respondAsJSON(response, 200, blogPost);
    else
        respond(response, 404, http.STATUS_CODES[404], "text/plain");
}

function postBlogPostHandler(request, response) {
    // Get the POST body
    getKeyValuePairsFromStream(request, function (error, data) {
        if (error) {
            respond(response, 404, http.STATUS_CODE[404], "text/plain");
        } else {
            console.error("KV pairs from POST request:\n" + JSON.stringify(data));
            if (data.title in db.blogPosts) {
                // Cannot have post with this title brah
                console.error("post already exists!");
                respond(response, 400, "You already have this post", "text/plain");
            } else {
                db.blogPosts[data.title] = data;
                console.error("db contains new blog post: " + (data.title in db.blogPosts));
                respond(response, 200, "created", "text/plain");
            }
        }
    });
}

/* Handles the /projects */
function projectsHandler(request, response) {
    var projectPosts = db.projectPosts;
    respondAsJSON(response, 200, projectPosts);
}

function getAdminHandler(request, response) {
    // make login system
    console.error("sent a GET to /admin");
    respond(response, 200, "Not finished you fool!", "text/plain");
}

function loginHandler(request, response) {
    // make login system
    //getKeyValuePairsFromStream(request, function () {});
    console.error("sent a POST to /admin");
    respond(response, 200, "Not finished you fool!", "text/plain");
}

// 401 - unauthorized
// 400 - Bad Request
// 404 - Forbidden - request is valid but server refuses to respond
// 405 - method not allowed

var server = http.createServer(function (request, response) {
    if (!Router.resolve(request, response)) {
        // send a 404
        console.error("Unable to route " + url.parse(request.url).pathname + " : sending 404");
        respond(response, 404, http.STATUS_CODES[404],"text/plain");
    }
})

server.on('clientError', function (err, socket) {
    console.error("server clientError event encountered");
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
})

server.listen(8080);
console.error("listening to port 8080");
