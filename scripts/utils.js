var http = require("http");

/* utils - utility functions */
module.exports = new (function(){

    /* Respond with statusCode, data with type and headers
     *
     * @response http.ServerResponse
     * @statusCode int
     * @body String
     * @type String
     * @headers Object
     */
    this.respond = function (response, statusCode, data, type, header) {
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
        console.error("\n\n");
    };

    this.respondAsJSON = function(response, statusCode, data, header) {
        this.respond(response, statusCode, JSON.stringify(data), "application/json", header);
    };

    this.respondWithStatus = function(response, statusCode, headers) {
        this.respond(response, statusCode, http.STATUS_CODES[statusCode], null, headers);
    };

    /*
     * Scrape key value pairs from request body
     * @request http.IncomingMessage and calls callback on body
     */
    this.getKVPairsFromBody = function(request, callback) {
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
                // TODO: send error response
            }
        }).on("end", function () {
            var result, error;
            try {
                result = querystring.parse(body);
            } catch (e) {error = e;}
            callback(error, result);
        });
    };

    /* parses the cookies from request header */
    this.parseCookies = function(request) {
        var list = {};
        rc = request.headers.cookie;
        if (rc)
            rc.split(';').forEach(function (cookie) {
                var parts = cookie.split("=");
                list[parts.shift().trim()] = decodeURI(parts.join("="));
            });

        return list;
    };
})();
