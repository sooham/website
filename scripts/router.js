var url = require("url");

// A simple URL router
var Router = function() {
    this.routes = [];
}

/* Add a patten and associated handler to the router
 * @pattern RegExp
 * @handler Function (http.IncomingMessage, http.ServerResponse,  ...)
 */
Router.prototype.add = function(pattern, handler) {
    this.routes.push({
        "pattern": pattern,
        "handler": handler
    });
}

/* Routes a request and calls the associated function handler on
 * the request and any captured groups. returns true if the request
 * was routed correctly (matched any one of the route patterns).
 *
 * @request http.IncomingMessage
 * @response http.ServerResponse
 */
Router.prototype.route = function(request, response) {
    var requestURL =  request.url;
    var isRouted = this.routes.some(function(route) {
        // TODO: Do I need to make this deal with POST requests to /admin?
        var path = url.parse(requestURL).pathname;
        var match = route.pattern.exec(path);
        if (match) {
            // call route.handler with request and all captured groups
            var args = [];
            for (var i = 0; i < match.length - 2; i++) {
                if (match[i])
                    args.push(decodeURIComponent(match[i]));
            }
            args.unshift(response);
            args.unshift(request);
            route.handler.apply(null, args);
            return true;
        }
        return false;
    });

    return isRouted;
}

module.exports = new Router();
