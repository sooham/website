// Set the error event for response
// TODO: Handle errors more gracefully using Errors node.js lib
// TODO: What is the difference between implicit and explicit headers?
// TODO: use better HTTP response codes
var http = require("http");
var querystring = require("querystring");
var tls = require("tls"); // TODO: (make HTTPS) 
var url = require("url");


var Router = require("./router");
var Database = require("./database");
var userServices = require("./userServices");

// create instances of local modules
var router = new Router();
var db = new Database();

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
        if (body.length > 1e6)      // TODO: Why? (also try to prevent execssive RAM usage pls)
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

// setup the database
db.connection.on("error", handler); // TODO: replace with database error handler
db.once("open", function() {
    console.error("database is ready and operational");
    // TODO: some more stuff
});

// add routes for different URLs
router.add("GET", /^\/$/, rootHandler);
router.add("GET", /^\/admin\/?$/, getAdminHandler);
router.add("GET", /^\/blog\/([^\/]+)\/?$/, getBlogPostHandler);
router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
router.add("GET", /^\/projects\/?$/, projectsHandler);
router.add("POST", /^\/admin\/?$/, loginHandler);
router.add("POST", /^\/blog\/?$/, postBlogPostHandler);
router.add("POST", /^\/admin\/create\/?$/, adminCreationHandler);

// code to save a BlogPost
post.save(function (error, post) {
    // deal with errors here
})

/* Handles the / */
function rootHandler(request, response) {
    // do a redirect to /blog
    respond(response, 302, "", "text/plain", {"Location": "/blog"});
}

/* Handles the GET /blog */
function getBlogPostsHandler(request, response) {
    // get JSON posts from the database
    db.findAllPosts(function (error, data) {
        if (error)
            respond(response, 500, http.STATUS_CODES[500], "text/plain"); // TODO: double check
        else if (data.length)
            respondAsJSON(response, 200, data);
        else
            respond(response, 200, "You haven't created any posts yet.", "text/plain");
    });
}

/* Handles the get /blog/post-name */
function getBlogPostHandler(request, response) {
    // get post from the database
    var postTitle = arguments[2];

    db.findPostWithTitle(postTitle, function (error, data) {
        if (error)
            respond(response, 500, http.STATUS_CODES[500], "text/plain"); // TODO: double check
        else if (data.length)
            respondAsJSON(response, 200, data);
        else
            respond(response, 404, http.STATUS_CODES[404], "text/plain");
    });
}

// TODO: needs better variable names
// TODO: only allow logged in people to make Posts
function postBlogPostHandler(request, response) {
    // Get the POST body
    getKeyValuePairsFromStream(request, function (error, newPost) {
        if (error) {
            respond(response, 500, http.STATUS_CODES[500], "text/plain"); // TODO
        } else {
            console.error("KV pairs from POST request:\n" + JSON.stringify(newPost));
            // check if post with title already exists
            db.blog.find({title: newPost.title}, function (error, data) {
                if (error) {
                    respond(response, 500, http.STATUS_CODES[500], "text/plain"); // TODO
                } else if (data.length) {
                    console.error("blog post with title already exists");
                    respond(response, 500, "this blog post title already exists", "text/plain");
                } else {
                    console.error("saving the blog post");
                    db.savePost(newPost, function (err) {
                        if (error)
                            respond(response, 500, http.STATUS_CODES[500], "text/plain");
                        else
                            respond(response, 200, "created", "text/plain");
                    });
                }

            });
        }
    });
}

/* Handles the /projects */
function projectsHandler(request, response) {
    db.findAllProjects(function (error, projects) {
        if (error)
            respond(response, 500, http.STATUS_CODES[500], "text/plain");
        else
            respondAsJSON(response, 200, projects);
    });
}

// TODO: Why does this not conflict with /admin/index.html?
function getAdminHandler(request, response) {
    // TODO: make login system
    console.error("sent a GET to /admin");
    respond(response, 200, "Not finished you fool!", "text/plain");
}

function loginHandler(request, response) {
    getKeyValuePairsFromStream(request, function (error, data) {
        if (error) {
            respond(response, 500, http.STATUS_CODES[500], "text/plain"); // TODO: double check
        } else {
            // TODO: make userServices.validate and other
            userServices.validate(data, function (error, isCorrectLogin) {
                if (isCorrectLogin) {
                    // set cookies and
                    // redirect to the create blog post page
                } else {
                    // send a incorrect username or password message
                }
            })
        }
    });
    respond(response, 200, "Not finished you fool!", "text/plain");
}

function adminCreationHandler(request, response) {
    // create a new admin here iff db has 0 admins
}

// 401 - unauthorized
// 400 - Bad Request
// 404 - Forbidden - request is valid but server refuses to respond
// 405 - method not allowed

var server = http.createServer(function (request, response) {
    if (!router.resolve(request, response)) {
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
