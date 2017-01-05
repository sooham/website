import React from "react";

import styles from "styles/about.module.css";

import $ from "jquery"

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
        return (
            <div className={styles.about}>
                <article>
                    <header className={styles.aboutHeader}>
                        <h2>About me</h2>
                    </header>
                    <section className={styles.aboutBody}>
                        <img className={styles.aboutPicture} src="/aboutPicture.png"/>
                        <p>I am a third year student at the University of Toronto.</p>
                        <p>I enjoy creating art as an outlet for creative release.</p>
                        <p>Observing physical pheomenon is also of great interest.</p>
                    </section>
                </article>
            </div>
        );
    }
});