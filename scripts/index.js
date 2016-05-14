/* Clientside templating for blog.
 * Includes a self built templating system
 */

var COLORS = ["#cc3300", "#41ba2f", "#45b29d", "#efc94c"];
/* Fills in the template tags of text according to
 * key value pairs in replacement dictionary replacementDict
 */
var fillTemplate = function(text, replacementDict) {
    var templatePattern = /\{\{(.+?)\}\}/g;
    var match;
    var lastIndex = 0;
    var result = "";

    while ((match = templatePattern.exec(text))) {
        console.log("match found: " + match[0] + " at index " + match.index);
        result += text.slice(lastIndex, match.index);
        result += replacementDict[match[1]] || "";
        lastIndex = match.index + match[0].length;
        console.log("text is now: " + result);
    }
    return result;
};


// get the content
var content = document.getElementById("content");
// get post template
var postTemplate = document.getElementById("post-template");
// get state object
var siteState = document.getElementById("site-head-state");

var changeState = function(text) {
    siteState.innerHTML = text;
    siteState.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
};

var loadBlogPosts = function() {
    var blogPostRequest = new XMLHttpRequest();
    blogPostRequest.open("GET", "/blog", true);

    blogPostRequest.addEventListener("load", function () {
        if (blogPostRequest.status === 200) {
            console.log("No error");
            // get the postJSON and add new posts to the DOM
            var postsJSON = JSON.parse(blogPostRequest.response);
            console.log("posts are: ");
            console.log(JSON.stringify(postsJSON));
            postsJSON.forEach(function (post) {
                post.encodedTitle = encodeURIComponent(post.title);
                console.log("post is: " + JSON.stringify(post));
                console.log("title is: " + post.title);
                var postElement = document.createElement("article");
                postElement.className = "post";
                postElement.innerHTML = fillTemplate(postTemplate.innerHTML.trim(), post);
                console.log("Final element to add:");
                console.log(postElement);
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
        // TODO: caching
        console.log("you pressed the btn");
        event.preventDefault();
        changeState("blog");
        deleteAllPosts();
        loadBlogPosts();
    }, false);
});

var projectButtons = document.getElementsByClassName("projectButton");

// TODO: time stamping posts and only loading the good posts
// TODO: implement projects button
// add the initial onclick function to the blogButtons
// do the same with the project button
changeState("blog");
loadBlogPosts();
