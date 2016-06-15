// @flow

// TODO: autoprefixer is not working on .module.css files
// in styles folder. fix the issue and remove all vendor prefixes

// TODO: separate component for contact info
// and email form for online communication
import React from "react";
import Link from "react-router/lib/Link";
import TransitionGroup from "react/lib/ReactTransitionGroup";
import "utils/mediaScreenResizeFix";

import styles from "styles/dashboard.module.css";
import activeLink from "styles/activeLink";

// TODO: activeClassName instead of activeStyle!
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
                            <Link to="/blog" activeStyle={activeLink} >
                                Blog
                            </Link>
                            <Link to="/demos" activeStyle={activeLink} >
                                Demos
                            </Link>
                            <Link to="/projects" activeStyle={activeLink} >
                                Projects
                            </Link>
                            <Link to="/resume" activeStyle={activeLink} >
                                Resume
                            </Link>
                        </nav>
                    </div>
                    <div >
                        <div className={styles.contactInfo}>
                            <p>
                                <i className={"fa fa-phone fa-fw"} aria-hidden="true"></i>
                                <a href="tel:6478366256">  +1 (647) 836-6256</a>
                            </p>
                            <p>
                                <i className={"fa fa-envelope fa-fw"} aria-hidden="true"></i>
                                <a href="mailto:rafizsooham@gmail.com"> rafizsooham@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
                <TransitionGroup
                    transitionEnterTimeout={400}
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
