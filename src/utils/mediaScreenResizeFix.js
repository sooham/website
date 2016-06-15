/* This script resizes the #indexNav when window is
 * resized across two different media queries
 */

if (typeof window != "undefined") {
    window.addEventListener("resize", function() {
        var content = document.getElementById("displayContent");
        if (content.children.length) {
            var indexNav = document.getElementById("indexNav");
            if (window.matchMedia("(min-width: 768px)").matches) {
                // resized to desktop (from mobile possibly)
                // change #indexNav width to 30% if displaying any
                // content
                indexNav.style.width = "30%";
            } else {
                // resized to mobile (from mobile possibly)
                // resize #indexNav width to 100%
                indexNav.style.width = "100%";
            }
        }
    });
}
