// @flow

// TODO: autoprefixer is not working on .module.css files
// in styles folder. fix the issue and remove all vendor prefixes

import React from "react";
import Link from "react-router/lib/Link";
import TransitionGroup from "react/lib/ReactTransitionGroup";
import "utils/mediaScreenResizeFix";

import styles from "styles/dashboard.module.css";
import activeLink from "styles/activeLink";

// TODO: activeClassName instead of activeStyle!
// TODO: need to add an art link and component to the page
export default React.createClass({
    render: function() {
        return (
            <div>
                <div id="indexNav">
                    <div id={styles.siteHeader}>
                        <div>
                            <h1><Link to="/">Sooham</Link></h1>
                            <h1><Link to="/">Rafiz</Link></h1>
                        </div>
                    </div>
                    <div>
                        <nav>
                            <Link to="/about" activeStyle={activeLink} >
                                About
                            </Link>
                            <Link to="/blog" activeStyle={activeLink} >
                                Blog
                            </Link>
                            <a href="/resume.pdf">
                                Resume
                            </a>
                        </nav>
                    </div>
                    <div >
                        <div className={styles.contactInfo}>
                                <a href="tel:6478366256">
                                    <i className={"fa fa-phone fa-fw fa-lg"} aria-hidden="true"></i>
                                </a>
                                <a href="mailto:rafizsooham@gmail.com">
                                    <i className={"fa fa-envelope fa-fw fa-lg"} aria-hidden="true"></i>
                                </a>
                                <a href="https://github.com/sooham">
                                    <i className={"fa fa-github fa-fw fa-lg"} aria-hidden="true"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/sooham-rafiz">
                                    <i className={"fa fa-linkedin-square fa-fw fa-lg"} aria-hidden="true"></i>
                                </a>
                        </div>
                    </div>
                </div>
                <TransitionGroup
                    transitionEnterTimeout={400}
                    component="div"
                    id="displayContent"
                >
                    {this.props.children || null }
                </TransitionGroup>
            </div>
        );
    }
});
