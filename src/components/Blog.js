import React from "react";
import Link from "react-router/lib/Link";
import styles from "styles/blog.module.css";
import blog from "utils/blog"
import $ from "jquery";


// TODO: move to containers/
// TODO: add proptypes and default props and what not

export default React.createClass({
    // TODO: did a quick and dirty fix to enable animation when user
    // does not start at /, clean this up by including a state in this component
    // should these be with the parent?
    // TODO: you'll need to pass a state down from parent to child,
    // seems like the most effective way to fix this issue

    componentWillAppear: function (cb) {
        $(document).ready(() => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $("#indexNav").width("30%");
            }
            cb();
        });
    },

    componentWillEnter: function(cb) {
        $(document).ready(() => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $("#indexNav").animate(
                    {width: "30%"}, 400
                    );
            }
            cb();
        });
    },

    componentWillLeave: function(cb) {
        $(document).ready(() => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $("#indexNav").animate(
                    {width: "100%"}, 400
                    );
            }
            cb();
        });
    },

    render: function() {
        const blogPostList = blog.blogPostList;
        return (
            <div className={styles.contentList}>
                <ul role="nav">
                    {
                        blogPostList.map(function(post, index) {
                            return (
                                <li key={index}>
                                    <Link to={`/blog/${post.title}`}>
                                        <h2>{post.title}</h2>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});
