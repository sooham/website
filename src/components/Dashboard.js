// @flow

// TODO: autoprefixer is not working on .module.css files
// in styles folder. fix the issue and remove all vendor prefixes
import React from "react";
import { Link } from "react-router";

import styles from "styles/dashboard.module.css";

export default React.createClass({
    render: function() {
        return (
            <div className={styles.appRoot}>
                <div className={styles.indexNav}>
                    <h1 id={styles.siteHeader}>
                        <Link to="/">Sooham Rafiz</Link>
                    </h1>
                    <nav>
                        <Link to="/blog">Blog</Link>
                        <Link to="/demos">Demos</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/">Resume</Link>
                    </nav>
                    <p>Contact</p>
                </div>
                <div>
                    {this.props.children || ("")}
                </div>
            </div>
        );
    }
});
