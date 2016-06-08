// @flow

import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <Link to="/"><h1>Sooham Rafiz</h1></Link>
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
