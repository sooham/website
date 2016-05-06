var url = require("url");

// A simple URL router
var Router = function() {
    this.routes = [];
}

/* Add a patten with method and associated handler to the router
 * @method String
 * @pattern RegExp
 * @handler Function (http.IncomingMessage, http.ServerResponse,  ...)
 */
Router.prototype.add = function(method, pattern, handler) {
    this.routes.push({
        "method": method,
        "pattern": pattern,
        "handler": handler
    });
}

/* Resolves a request and calls the associated function handler on
 * the request and any captured groups. returns true if the request
 * was routed correctly (matched any one of the route patterns and method).
 *
 * @request http.IncomingMessage
 * @response http.ServerResponse
 */
Router.prototype.resolve = function(request, response) {
    var path = url.parse(request.url).pathname;

    var isRouted = this.routes.some(function(route) {
        // TODO: Do I need to make this deal with POST requests to /admin?
        var match = route.pattern.exec(path);
        if (match && route.method === request.method) {
            // call route.handler with request and all captured groups
            var args = match.slice(1).map(decodeURIComponent);
            route.handler.apply(null, [request, response].concat(args));
            return true;
        }
        return false;
    });

    return isRouted;
}

module.exports = new Router();
