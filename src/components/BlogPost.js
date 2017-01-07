import React from "react";
import Link from "react-router/lib/Link";
import blog from "utils/blog";

import $ from "jquery";

import styles from "styles/blogPost.module.css"

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
        const blogPostTitle = this.props.params.post;
        const post = blog.lookupBlogPost(blogPostTitle);

        return (
            <div className={styles.blog}>
                <article>
                    <div className={styles.backLink}>
                        <Link to="/blog">
                            <i className="fa fa-arrow-circle-left"></i>
                            Back
                        </Link>
                    </div>
                    <header className={styles.blogHeader}>
                        <h2>{post.title}</h2>
                        <p>{(post.date || post.from) || ""}</p>
                    </header>
                    <section dangerouslySetInnerHTML={post} className={styles.blogBody}>
                    </section>
                </article>
            </div>
        );
    }
});