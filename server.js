// Set the error event for response
// TODO: Handle errors more gracefully using Errors node.js lib
// TODO: What is the difference between implicit and explicit headers?
// TODO: use a logger with different error severity stuff
// TODO: there might be some fake cookies for testing here, forgot about it
var ecstatic = require("ecstatic");
var fs = require("fs");
var http = require("http");
var https = require("https");
var querystring = require("querystring");
var url = require("url");


var Router = require("./scripts/router");
var Database = require("./scripts/database");
var userServices = require("./scripts/userServices");
var utils = require("./scripts/utils");

console.error("All modules imported");

var HTTP_PORT = 8080;
var HTTPS_PORT = 8000;

// create instances of local modules
var router = new Router();
var db = new Database();
var fileServer = ecstatic({
    root: __dirname,
    port: HTTPS_PORT,
    showDir: false,
    showDotfiles: false
});

var db_error_flag = false;
// setup the database
db.connection.on("error", function() {
    console.error("database threw 'error' event!");
    db_error_flag = true;
    // TODO: send 503 errors on requests
}).once("open", function() {
    console.error("Database loaded");
});

// TODO: What to do if we get a request before we have a database open?
// how does mongoose handle that?

// add routes for different URLs
router.add("GET", /^\/blog\/([^\/]+)\/?$/, getBlogPostHandler);
router.add("GET", /^\/blog\/?$/, getBlogPostsHandler);
router.add("GET", /^\/projects\/?$/, projectsHandler);
router.add("GET", /^\/admin\/?$/, getAdminHandler);
router.add("POST", /^\/admin\/?$/, loginHandler);
router.add("POST", /^\/admin\/create\/?$/, adminCreationHandler);
router.add("POST", /^\/blog\/?$/, postBlogPostHandler);
router.add("GET", /^\/editor\/?$/, getEditorHandler);

console.error("added all routes");

// Handlers for different routes

/* Handles the get /blog/post-name URL*/
function getBlogPostHandler(request, response) {
    // get post title from url
    var postTitle = arguments[2];
    console.error("finding post with title: " + postTitle);

    db.findPostWithTitle(postTitle, function(error, data) {
        console.error("found from database: " + data.toString());
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
        console.error("found from database: " + data.toString());
        if (error)
            utils.respondWithStatus(response, 500);
        else if (data.length)
            utils.respondAsJSON(response, 200, data);
        else
            utils.respondAsJSON(response, 200, [{
                title: "No Content",
                tags: [],
                date: Date.now(),
                body: "I still have to publish my first blog post. Please visit later."
            }]);
    });
}

/* Handles the /projects URL*/
function projectsHandler(request, response) {
    // TODO: get from github
    db.findAllProjects(function(error, projects) {
        console.error("found from database: " + projects.toString());
        if (error)
            utils.respondWithStatus(response, 500);
        else
            utils.respondAsJSON(response, 200, projects);
    });
}

// URLS handled via HTTPS

function loginHandler(request, response) {
    if (request.socket.getPeerCertificate) {
        console.error("Using HTTPS");
        // get the login form values and check credentials
        utils.getKVPairsFromBody(request, function(error, data) {
            if (error) {
                utils.respondWithStatus(response, 500);
            } else {
                console.error("form info usermail: " + data.usermail + " pass: " + data.password);
                // get Sooham's login credentials from db
                db.getSoohamLoginCredentials(function(error, result) {
                    if (error)
                        utils.respondWithStatus(response, 500);

                    console.error("database credentials: " + result);
                    if (result.length) {
                        // compare input and result
                        userServices.validate(data, result[0], function(isCorrect) {
                            if (isCorrect) {
                                console.error("login info correct");
                                // set cookies
                                // TODO: set cookie needs a expiration date and
                                // and we need to check the domain of the cookie
                                utils.respondWithStatus(response, 301, {
                                    "Location": "https://" + request.headers.host + "/editor",
                                    //"Set-Cookie": "loginSession=" + result[0].loginSession + ";Secure;path=/;domain=." + request.headers.host
                                    "Set-Cookie": "loginSession=" + result[0].loginSession + ";path=/;httpOnly;Secure"
                                });
                            } else {
                                console.log("Incorrect email / password");
                                utils.respond(response, 200, "Incorrect email or password");
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
        console.error("Using HTTP");
        //utils.respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + request.url });
        utils.respondWithStatus(response, 301, { "Location": "https://localhost:" + HTTPS_PORT + request.url });
    }
}

function postBlogPostHandler(request, response) {
    // TODO: Cookies have no expiration as of now, they are only session
    // cookies, please turn it into a permanent cookie later
    // TODO: check if login is being done over HTTP or https
    if (request.socket.getPeerCertificate) {
        console.error("HTTPS");
        // posting begin done over HTTPS
        // check if the loginSession Cookie is in the header of request is correct
        var cookies = utils.parseCookies(request);
        console.error("Cookies from request: " + JSON.stringify(cookies));
        db.getSoohamLoginCredentials(function(error, loginCreds) {
            if (error)
                utils.respondWithStatus(response, 500);

            console.error("database login creds " + loginCreds);
            if (loginCreds.length && (loginCreds[0].loginSession === cookies.loginSession)) {
                console.error("cookie correct, can post");
                // get the post blog body and save it into the database
                utils.getKVPairsFromBody(request, function(error, newPost) {
                    if (error) {
                        utils.respondWithStatus(response, 500);
                    } else {
                        newPost.tags = newPost.tags.split(",");
                        var inputDate = newPost.date.split("-");
                        newPost.date = new Date(inputDate[0], inputDate[1]-1, inputDate[2]);
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
                                var savePost = new db.blog(newPost);
                                console.error("post object is" + savePost);
                                savePost.save(function(error) {
                                    if (error)
                                        utils.respondWithStatus(response, 500);
                                    else {
                                        //utils.respondWithStatus(response, 201, {
                                        //    "Location": "http://" + request.headers.host + "/" + newPost.title
                                        //});
                                        utils.respondWithStatus(response, 201, {
                                            "Location": "http://localhost:" + HTTP_PORT + "/" + encodeURIComponent(savePost.title)
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                console.error("cookie incorrect, cant post");
                // User has not registered or is has not logged in during session
                // redirect to /admin
                utils.respondWithStatus(
                    response, 301, { "Location": "https://" + request.headers.host + "/admin" }
                );
            }
        });
    } else {
        console.error("HTTP");
        // posting a blog post being done over HTTP
        // redirect to /admin HTTPS
        //respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + "/admin" });
        respondWithStatus(response, 301, { "Location": "https://localhost:" + HTTPS_PORT + "/admin" });
    }
}

// TODO: Why does this not conflict with /admin/index.html?
function getAdminHandler(request, response) {
    // redirect to /admin if no loginSession cookie found
    // else redirect to /editor
    var cookies = utils.parseCookies(request);
    console.error("cookies from request: " + JSON.stringify(cookies));
    db.getSoohamLoginCredentials(function(error, loginCreds) {
        if (error)
            utils.respondWithStatus(response, 500);

        if (loginCreds.length && loginCreds[0].loginSession === cookies.loginSession) {
            console.error("cookies let you go to editor");
            //utils.respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + "/editor" });
            utils.respondWithStatus(response, 301, { "Location": "https://localhost:" + HTTPS_PORT + "/editor" });
        } else {
            console.error("no cookies go to admin");
            console.log(request.headers);
            if (request.socket.getPeerCertificate) {
                fileServer(request, response);
            } else {
                utils.respondWithStatus(response, 301, { "Location": "https://localhost:" + HTTPS_PORT + "/admin" });
            }
            //utils.respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + request.url });
        }
    });
}


function adminCreationHandler(request, response) {
    // create a new admin here iff db has 0 admins
    // get the body of the post request
    if (request.socket.getPeerCertificate) {
        console.error("HTTPS");
        // admin creation being done over HTTPS
        db.getSoohamLoginCredentials(function(error, loginCreds) {
            if (error)
                utils.respondWithStatus(response, 500);

            console.error("db login info" + loginCreds);
            if (loginCreds.length) {
                console.error("user already exists");
                // user already exists, deny creating a new login
                utils.respondWithStatus(response, 403);
            } else {
                console.error("user does not exist");
                // create a new user and store in database
                utils.getKVPairsFromBody(request, function(error, data) {
                    console.error("account creation for " + JSON.stringify(data));
                    if (error) {
                        utils.respondWithStatus(response, 500);
                    } else if (data.usermail && data.password) {
                        console.error("storing into database...");
                        // TODO: need to do proper usermail validation and password length verification
                        userServices.generateRandomBytes(data.password.length, function(error, salt) {
                            salt = salt.toString("hex");
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

                                userJSON.loginSession = rand.toString("hex");

                                console.error("db to store: " + userJSON);
                                var user = new db.user(userJSON);

                                console.error("calling save()");
                                user.save(function(error) {
                                    if (error)
                                        utils.respondWithStatus(response, 500);
                                    else
                                        utils.respondWithStatus(response, 200);
                                });
                            });
                        });
                    } else {
                        // incoming POST request is not correct
                        console.error("post request not correct");
                        utils.respondWithStatus(response, 400);
                    }
                });
            }
        });
    } else {
        console.error("HTTP");
        // admin creation being done over HTTP
        utils.respondWithStatus(response, 403);
    }
}

function getEditorHandler(request, response) {
    // TODO: need to check for cookie
    if (!request.socket.getPeerCertificate) {
        console.error("HTTP");
        // using HTTP connection, redirect to /admin
        //utils.respondWithStatus(301, { "Location": "https://" + request.headers.host + "/admin" });
        utils.respondWithStatus(response, 301, { "Location": "https://localhost:" + HTTPS_PORT + "/admin" });
    } else {
        // TODO: Check cookie is set
        var cookies = utils.parseCookies(request);
        db.getSoohamLoginCredentials(function(error, loginCreds) {
            if (error)
                utils.respondWithStatus(response, 500);

            if (loginCreds.length && loginCreds[0].loginSession === cookies.loginSession) {
                fileServer(request, response);
            } else {
               //utils.respondWithStatus(response, 301, { "Location": "https://" + request.headers.host + "/admin" });
               utils.respondWithStatus(response, 301, { "Location": "https://localhost:" + HTTPS_PORT + "/admin" });
            }
        });
    }
}

// create HTTP server to deal with all visitor requests
var server = http.createServer(function(request, response) {
    if (!router.resolve(request, response)) {
        console.error("Unable to route " + url.parse(request.url).pathname + " : to fileServer");
        fileServer(request, response);
    }
});

server.on('clientError', function(err, socket) {
    console.error("HTTP server clientError event encountered");
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
});

server.listen(HTTP_PORT);
console.error("listening to port " + HTTP_PORT);

// HTTPS server
// get certificates for HTTPS server
var key = fs.readFileSync("./certs/privatekey.pem");
var cert = fs.readFileSync("./certs/certificate.pem");

var options = { "key": key, "cert": cert };

// create HTTPS server to deal with all admin requests
var HTTPSServer = https.createServer(options, function(request, response) {
    // TODO: check if request type is correct GET and POST
    if (!router.resolve(request, response)) {
        console.error("Unable to route " + url.parse(request.url).pathname + " : to fileServer");
        // check if POST b4 file server TODO
        fileServer(request, response);
    }
});

HTTPSServer.on('clientError', function(err, socket) {
    console.error("HTTPS server clientError event encountered");
    socket.end("HTTP/1.1 400 Bad request\r\n\r\n");
});

HTTPSServer.listen(HTTPS_PORT);
console.error("listening to port " + HTTPS_PORT);
