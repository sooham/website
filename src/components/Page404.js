import React from "react";
import $ from "jquery";

import styles from "styles/page404.module.css";

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
        return (<p id={styles.text404}>This page does not exist! Or does it?</p>);
    }
});