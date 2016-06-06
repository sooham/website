import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render() {
        return (
            <div>
                <ul role="nav">
                    <li><Link to="/show/blog/p/1">Blog</Link></li>
                    <li><Link to="/show/projects">Projects</Link></li>
                    <li><Link to="/show/demos/titlehere">Demos</Link></li>
                    <li>Resume</li>
                </ul>
                <h6>Contact Info</h6>
            </div>
        );
    }
});
