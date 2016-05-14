/* Clientside templating for blog.
 * Includes a self built templating system
 */


/* Fills in the template tags of text according to
 * key value pairs in replacement dictionary replacementDict
 */
var fillTemplate = function(text, replacementDict) {
    var templatePattern = /\{\{(.+?)\}\}/g;
    var match;

    while ((match = templatePattern.exec(text))) {
        text = text.split(match[0]).join(replacementDict[match[1]]);
    }
    return text;
};


// get the content
var content = document.getElementById("content");
// get post template
var postTemplate = document.getElementById("post-template");
// get state object
var siteState = document.getElementById("site-head-state");

var changeState = function(text) {
    siteState.innerHTML = fillTemplate(siteState.innerHTML, {state: text});
};

var loadBlogPosts = function() {
    var blogPostRequest = new XMLHttpRequest();
    blogPostRequest.open("GET", "/blog", true);

    blogPostRequest.addEventListener("load", function () {
        if (blogPostRequest.status === 200) {
            // get the postJSON and add new posts to the DOM
            var postJSON = blogPostRequest.response;

            postJSON.encodedTitle = encodeURIComponent(postJSON.title);
            postJSON.forEach(function (post) {
                var postElement = document.createElement("article");
                postElement.className = "post";
                postElement.innerHTML = fillTemplate(postTemplate.innerHTML, post);
                content.appendChild(postElement);
            });
        } else if (blogPostRequest.status >= 400) {
            // redirect to Error page
        }
    });

    blogPostRequest.send(null);
};


/* Delete all non-template posts from the DOM */
var deleteAllPosts = function() {
    var posts = document.getElementsByClassName("post");
    Array.prototype.forEach.call(posts, function (post) {
        content.removeChild(post);
    });
};

// First request for /blog objects
// when you get the JSON object representing the blog posts
// get the empty sample template from the DOM and replace the
// text elements in the templates
// adding the child


// get the navigation buttons
var blogButtons = document.getElementsByClassName("blogButton");

Array.prototype.forEach.call(blogButtons, function (btn) {
    btn.addEventListener("click", function (event) {
        // TODO: state color changing
        changeState("blog");
        event.preventDefault();
        deleteAllPosts();
        loadBlogPosts();
    }, false);
});

var projectButtons = document.getElementsByClassName("projectButton");

// TODO: time stamping posts and only loading the good posts
// TODO: implement projects button
// add the initial onclick function to the blogButtons
// do the same with the project button


