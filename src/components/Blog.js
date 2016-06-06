import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render() {
        return (
            <div>
                <h5>Blog</h5>
                <ul>
                    <li><Link to="/show/blog/postexample">Post1</Link></li>
                    <li><Link to="/show/blog/postexample">Post2</Link></li>
                    <li><Link to="/show/blog/postexample">Post3</Link></li>
                    <li><Link to="/show/blog/postexample">Post4</Link></li>
                    <li>...</li>
                    <li><Link to="/show/blog/postexample">Post10</Link></li>
                </ul>
            </div>
        );
    }
});
