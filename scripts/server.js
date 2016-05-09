// Set the error event for response
// TODO: Handle errors more gracefully using Errors node.js lib
// TODO: What is the difference between implicit and explicit headers?
// TODO: use better HTTP response codes
// TODO: use a logger with different error severity stuff
var fs = require("fs");
var http = require("http");
var https = require("https");
var querystring = require("querystring");
var url = require("url");

var HTTP_PORT = 80;
var HTTPS_PORT = 443;


var Router = require("./router");
var Database = require("./database");
var userServices = require("./userServices");

// create instances of local modules
var router = new Router();
var db = new Database();

// Helper functions

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
        "Content-Type": type || "text/plain"
    };
    if (header)
        Object.keys(header).forEach(function (key) {defaultHeader[key] = header[key];
        });

    console.error("type: " + (type || "text/plain"));
    console.error("headers: " + JSON.stringify(defaultHeader));
        
    response.writeHead(statusCode, defaultHeader);
    if (data)
        response.write(data);
    response.end();
}

/* Respond with JSON data with statusCode and headers */
function respondAsJSON(response, statusCode, data, headers) {
    respond(response, statusCode, JSON.stringify(data), "application/json", headers);
}

/* Respond with 404 */
function respond404(response) {
    respond(response, 404, http.STATUS_CODES[404]);
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
    }).on("data", function (data) {
        body += data;
        // too much POSTed data
        if (body.length > 1e6) {// TODO: Why?
            request.connection.destroy();
            // send error response
        }
    }).on("end", function () {
        var result, error;
        try {
            result = querystring.parse(body);
        } catch (e) {error = e;}
        callback(error, result);
    });
}

// parses the cookies
function parseCookies(request) {
    var list = {};
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split("=");
        list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

    return list;
}


// setup the database
db.connection.on("error", function () {
    console.error("database threw 'error' event!"); // TODO: send a request back
}); 
db.once("open", function() {
    console.error("database is ready and operational");
    // TODO: some more stuff
});

// add routes for different URLs
router.add("GET", /^\/$/, rootHandler);
router.add("GET", /^\/blog\/([^\/]+)\/?$/, getBlogPostHandler);
router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
router.add("GET", /^\/projects\/?$/, projectsHandler);

// handled via HTTPS connection
router.add("GET", /^\/admin\/?$/, getAdminHandler);
router.add("POST", /^\/admin\/?$/, loginHandler);
router.add("POST", /^\/admin\/create\/?$/, adminCreationHandler);
router.add("POST", /^\/blog\/?$/, postBlogPostHandler);
router.add("GET", /^\/editor\/?$/, getEditorHandler);


// Handlers for different routes

/* Handles the / */
function rootHandler(request, response) {
    // do a redirect to /blog
    respond(response, 301, null, null, {"Location": "/blog"});
}

/* Handles the get /blog/post-name URL*/
function getBlogPostHandler(request, response) {
    // get post title from url
    var postTitle = arguments[2];

    db.findPostWithTitle(postTitle, function (error, data) {
        if (error)
            respond(response, 500, http.STATUS_CODES[500]); // TODO: double check status code
        else if (data.length)
            respondAsJSON(response, 200, data);
        else
            respond404(response);
    });
}

/* Handles the GET /blog */
function getBlogPostsHandler(request, response) {
    // get JSON posts from the database
    db.findAllPosts(function (error, data) {
        if (error)
            respond(response, 500, http.STATUS_CODES[500]); // TODO: double check status
        else if (data.length)
            respondAsJSON(response, 200, data);
        else
            respond(response, 200, "You haven't created any posts yet.");
    });
}

/* Handles the /projects URL*/
function projectsHandler(request, response) {
    db.findAllProjects(function (error, projects) {
        if (error)
            respond(response, 500, http.STATUS_CODES[500]);
        else
            respondAsJSON(response, 200, projects);
    });
}

// URLS handled via HTTPS

function postBlogPostHandler(request, response) {
    // TODO: Cookies have no expiration as of now, they are only session
    // cookies, please turn it into a permanent cookie later
    
    // TODO: check if login is being done over HTTP or https
    var cookies = parseCookies(request);

    db.getSoohamLoginCredentials(function (error, loginCreds) {
        if (loginCreds.length && (loginCreds[0].loginSession === cookies.loginSession)) {
            // get the post body and save it into the database
            getKeyValuePairsFromStream(request, function (error, newPost) {
                if (error) {
                    respond(response, 500, http.STATUS_CODES[500]); // TODO: send response back
                } else {
                    console.error("KV pairs from POST request:\n" + JSON.stringify(newPost));
                    // check if post with title already exists
                    db.blog.find({title: newPost.title}, function (error, data) {
                        if (error) {
                            respond(response, 500, http.STATUS_CODES[500]); // TODO
                        } else if (data.length) {
                            console.error("blog post with title already exists");
                            respond(response, 500, "this blog post title already exists");
                        } else {
                            console.error("saving the blog post");
                            db.savePost(newPost, function (err) {
                                if (error)
                                    respond(response, 500, http.STATUS_CODES[500]);
                                else
                                    respond(response, 200, "created");
                            });
                        }

                    });
                }
            });
        } else {
            // User has not registered or is not logged in
            respond(response, 402, http>STATUS_CODES[402]);
        }
    });
}

// TODO: Why does this not conflict with /admin/index.html?
function getAdminHandler(request, response) {
    // redirect to HTTPS /amdin
        console.error("sent a GET to /admin, redirecting to HTTPS");
        respond(response, 301, null, null, {"Location": "https://" + request.headers["host"] + request.url});
    }
}

function loginHandler(request, response) {
    if (request.socket.getPeerCertificate) {
        getKeyValuePairsFromStream(request, function (error, data) {
            if (error) {
                respond(response, 500, http.STATUS_CODES[500]); // TODO: double check
            } else {
                // get sooham's login credentials from db
                db.getSoohamLoginCredentials(function (error, result) {
                    if (result.length) {
                        // given my real credentials and input data
                        userServices.validate(data, result[0], function (isCorrect) {
                            if (isCorrect) {
                                // set cookies
                                respond(response, 301, null, null, {
                                    "Location": "https://" + request.headers[host] + "/editor",
                                    "Set-Cookie": "loginSession=" + result[0].loginSession + ";" + " Secure;"
                                    });
                            } else {
                                console.log("Incorrect username / password");
                                respond(response, 500, "Incorrect username / password");
                            }
                        });
                    } else {
                        // login has not been created
                        console.error("you have not created the login");
                        respond(response, 500, http.STATUS_CODES[500]);
                    }
                });
            }
        });
    } else {
        // you are not on HTTPS connection, redirect to /admin
        respond(response, 301, null, null, {"Location": "https://" + request.headers["host"] + request.url});
    }
}

function adminCreationHandler(request, response) {
    // create a new admin here iff db has 0 admins
    // get the body of the post request
    if (request.socket.getPeerCertificate) {
        db.getSoohamLoginCredentials(function (error, loginCreds) {
            if (loginCreds.length) {
                // user already exists, deny creating a new login
                respond(request, 402, http.STATUS_CODES[402]);
            } else {
                // create a new user and store in database
                getKeyValuePairsFromStream(request, function (error, data) {
                    if (error) {
                        respond(request, 500, http.STATUS_CODES[500]);
                    } else if (data.usermail && data.password) {
                        var salt = userServices.generateSalt();
                        var user = db.user({
                                            usermail: hash(data.usermail), 
                                            password: hash(salt + data.password),
                                            salt: userServices.generateSalt();
                                            loginSession: userServices.createLoginSession();
                                            });
                        user.save(function (error) {
                            if (error)
                                respond(request, 500, http.STATUS_CODES[500]);
                        });
                    } else {
                        // incoming POST request is not correct
                        respond(request, 500, http.STATUS_CODES[500]);
                    }
                });
            }
        });
    } else {
        response(response, 402, "Forbidden");
    }
}

// 401 - unauthorized
// 400 - Bad Request
// 404 - Forbidden - request is valid but server refuses to respond
// 405 - method not allowed

// create HTTP server to deal with all vistor requests
var server = http.createServer(function (request, response) {
    if (!router.resolve(request, response)) {
        // send a 404
        console.error("Unable to route " + url.parse(request.url).pathname + " : sending 404");
        respond404(response);
    }
});

server.on('clientError', function (err, socket) {
    console.error("server clientError event encountered");
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
});

server.listen(HTTP_PORT);
console.error("listening to port 8080");

// get cetificates for HTTPS server
var key = fs.readFileSync("../certs/privateKey.pem");
var cert = fs.readFileSync("../certs/certificate.pem");

var options = {"key": key, "cert": cert};

// create HTTPS server to deal with all admin requests
var HTTPSServer = https.createServer(options, function (request, response) {
    if (!secureRouter.resolve(request, response)) {
        // send a 404
        respond404(response);
    }
}).listen(HTTPS_PORT);
