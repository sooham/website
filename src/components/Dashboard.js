// @flow

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
                        <Link to="/blog"><span>Blog</span></Link>
                        <Link to="/demos"><span>Demos</span></Link>
                        <Link to="/projects"><span>Projects</span></Link>
                        <Link to="/"><span>Resume</span></Link>
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
