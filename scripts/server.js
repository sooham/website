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

var Router = require("./router");
var Database = require("./database");
var userServices = require("./userServices");
var utils = require("./utils");

var HTTP_PORT = 80;
var HTTPS_PORT = 443;

// create instances of local modules
var router = new Router();
var db = new Database();

var db_error_flag = false;
// setup the database
db.connection.on("error", function() {
    console.error("database threw 'error' event!");
    db_error_flag = true;
    // TODO: send 503 errors on requests
}).once("open", function() {
    console.error("database is ready and operational");
});

// TODO: What to do if we get a request before we have a database open?
// how does mongoose handle that?

// add routes for different URLs
router.add("GET", /^\/$/, rootHandler);
router.add("GET", /^\/blog\/([^\/]+)\/?$/, getBlogPostHandler);
router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
router.add("GET", /^\/projects\/?$/, projectsHandler);
router.add("GET", /^\/admin\/?$/, getAdminHandler);
router.add("GET", /^\/$/, rootHandler);
router.add("GET", /^\/blog\/([^\/]+)\/?$/, getBlogPostHandler);
router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
router.add("GET", /^\/projects\/?$/, projectsHandler);
router.add("GET", /^\/admin\/?$/, getAdminHandler);
router.add("POST", /^\/admin\/?$/, loginHandler);
router.add("POST", /^\/admin\/create\/?$/, adminCreationHandler);
router.add("POST", /^\/blog\/?$/, postBlogPostHandler);
router.add("GET", /^\/editor\/?$/, getEditorHandler);


// Handlers for different routes

/* Handles the / */
function rootHandler(request, response) {
    // do a redirect to /blog
    utils.respondWithStatus(response, 301, { "Location": "/blog" });
}

/* Handles the get /blog/post-name URL*/
function getBlogPostHandler(request, response) {
    // get post title from url
    var postTitle = arguments[2];

    db.findPostWithTitle(postTitle, function(error, data) {
        if (error)
            utils.respondWithStatus(response, 500);
        else if (data.length)
            utils.respondAsJSON(response, 200, data);
        else
            utils.respondWithStatus(response, 404);
    });
}

/* Handles the GET /blog */
function getBlogPostsHandler(request, response) {
    // get JSON posts from the database
    db.findAllPosts(function(error, data) {
        if (error)
            utils.respondWithStatus(response, 500);
        else if (data.length)
            utils.respondAsJSON(response, 200, data);
        else
            utils.respondAsJSON(response, 200, [{
                title: "No Content",
                tags: [],
                date: new Date(), // TODO: Convert to GMT
                body: "I still have to publish my first blog post. Please visit later."
            }]);
    });
}

/* Handles the /projects URL*/
function projectsHandler(request, response) {
    db.findAllProjects(function(error, projects) {
        if (error)
            utils.respondWithStatus(response, t00);
        else
            respondAsJSON(response, 200, projects);
    });
}

// URLS handled via HTTPS

function loginHandler(request, response) {
    if (request.socket.getPeerCertificate) {
        // get the login form values and check credentials
        utils.getKVPairsFromBody(request, function(error, data) {
            if (error) {
                respondWithStatus(response, 500);
            } else {
                // get Sooham's login credentials from db
                db.getSoohamLoginCredentials(function(error, result) {
                    if (result.length) {
                        // compare input and result
                        userServices.validate(data, result[0], function(isCorrect) {
                            if (isCorrect) {
                                // set cookies
                                // TODO: set cookie needs a expiration date and
                                // and we need to check the domain of the cookie
                                utils.respondWithStatus(response, 301, {
                                    "Location": "https://" + request.headers.host + "/editor",
                                    "Set-Cookie": "loginSession=" + result[0].loginSession + ";" + " Secure;"
                                });
                            } else {
                                console.log("Incorrect email / password");
                                respond(response, 200, "Incorrect email or password");
                            }
                        });
                    } else {
                        // login has not been created
                        console.error("you have not created the login");
                        utils.respondWithStatus(response, 403);
                    }
                });
            }
        });
    } else {
        // request not passed though HTTPS connection, redirect to HTTPS version of /admin
        utils.respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + request.url });
    }
}

function postBlogPostHandler(request, response) {
    // TODO: Cookies have no expiration as of now, they are only session
    // cookies, please turn it into a permanent cookie later
    // TODO: check if login is being done over HTTP or https
    if (request.socket.getPeerCertificate) {
        // posting begin done over HTTPS
        // check if the loginSession Cookie is in the header of request is correct
        var cookies = utils.parseCookies(request);
        db.getSoohamLoginCredentials(function(error, loginCreds) {
            if (error)
                utils.respondWithStatus(response, 500);

            if (loginCreds.length && (loginCreds[0].loginSession === cookies.loginSession)) {
                // get the post blog body and save it into the database
                getKeyValuePairsFromStream(request, function(error, newPost) {
                    if (error) {
                        utils.respondWithStatus(response, 500);
                    } else {
                        console.error("KV pairs from blog post request:\n" + JSON.stringify(newPost));
                        // check if post with title already exists
                        db.blog.find({ title: newPost.title }, function(error, data) {
                            if (error) {
                                utils.respond(response, 500);
                            } else if (data.length) {
                                console.error("blog post with title already exists");
                                respond(response, 400, "This blog post title already exists");
                            } else {
                                console.error("saving the blog post");
                                var newPost = new db.blog(newPost);
                                db.savePost(newPost, function(err) {
                                    if (error)
                                        utils.respondWithStatus(response, 500);
                                    else
                                        utils.respondWithStatus(response, 201, {
                                            "Location": "http://" + request.headers.host + "/" + newPost.title
                                        });
                                });
                            }
                        });
                    }
                });
            } else {
                // User has not registered or is has not logged in during session
                // redirect to /admin
                utils.respondWithStatus(
                    response, 301, { "Location": "https://" + request.headers.host + "/admin" }
                );
            }
        });
    } else {
        // posting a blog post being done over HTTP
        // redirect to /admin HTTPS
        respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + "/admin" });
    }
}

// TODO: Why does this not conflict with /admin/index.html?
function getAdminHandler(request, response) {
    // redirect to HTTPS /admin if no loginSession cookie found
    // else redirect to editor
    var cookies = utils.parseCookies(request);
    db.getSoohamLoginCredentials(function(error, loginCreds) {
        if (error)
            utils.respondWithStatus(response, 500);

        if (loginCreds.length && loginCreds[0].loginSession === cookies.loginSession) {
            respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + "/editor" });
        } else {
            respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + request.url });
        }
    });
}


function adminCreationHandler(request, response) {
    // create a new admin here iff db has 0 admins
    // get the body of the post request
    if (request.socket.getPeerCertificate) {
        // admin creation being done over HTTPS
        db.getSoohamLoginCredentials(function(error, loginCreds) {
            if (error)
                utils.respondWithStatus(response, 500);

            if (loginCreds.length) {
                // user already exists, deny creating a new login
                utils.respondWithStatus(request, 403);
            } else {
                // create a new user and store in database
                utils.getKVPairsFromBody(request, function(error, data) {
                    if (error) {
                        utils.respondWithStatus(request, 500);
                    } else if (data.usermail && data.password) {
                        // TODO: need to do proper usermail validation and password length verification
                        userServices.generateRandomBytes(user.password.length, function(error, salt) {
                            if (error)
                                utils.respondWithStatus(response, 500);

                            var userJSON = {
                                usermail: userServices.hash(data.usermail),
                                password: userServices.hash(salt + data.password),
                                "salt": salt
                            };
                            userServices.generateRandomBytes(128, function(error, rand) {
                                if (error)
                                    utils.respondWithStatus(response, 500);
                                user.loginSession = rand;
                            });

                            var user = new db.user(userJSON);
                            user.save(function(error) {
                                if (error)
                                    utils.respondWithStatus(request, 500);
                                else
                                    utils.respondWithStatus(request, 200);
                            });
                        });
                    } else {
                        // incoming POST request is not correct
                        utils.respondWithStatus(request, 400);
                    }
                });
            }
        });
    } else {
        // admin creation being done over HTTP
        utils.respondWithStatus(response, 403);
    }
}

function getEditorHandler(request, response) {
    if (!request.socket.getPeerCertificate) {
        // using HTTP connection, redirect to /admin
        utils.respondWithStatus(301, { "Location": "https://" + request.headers.host + "/admin" });
    }
    // otherwise, fetch from the file system
}

// create HTTP server to deal with all visitor requests
var server = http.createServer(function(request, response) {
    if (!router.resolve(request, response)) {
        console.error("Unable to route " + url.parse(request.url).pathname + " : sending 404");
        utils.respondWithStatus(response, 404);
    }
});

server.on('clientError', function(err, socket) {
    console.error("server clientError event encountered");
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
});

server.listen(HTTP_PORT);
console.error("listening to port " + HTTP_PORT);

// HTTPS server
// get certificates for HTTPS server
var key = fs.readFileSync("../certs/privateKey.pem");
var cert = fs.readFileSync("../certs/certificate.pem");

var options = { "key": key, "cert": cert };

// create HTTPS server to deal with all admin requests
var HTTPSServer = https.createServer(options, function(request, response) {
    if (!router.resolve(request, response)) {
        utils.respondWithStatus(response, 404);
    }
});

HTTPSServer.on('clientError', function(err, socket) {
    console.error("server clientError event encountered");
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
});

HTTPSServer.listen(HTTPS_PORT);
