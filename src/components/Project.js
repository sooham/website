import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render() {
        return (
            <div>
                <h5>Project</h5>
                <ul>
                    <li><Link to="/show/project/projex">Proj1</Link></li>
                    <li><Link to="/show/project/projex">Proj2</Link></li>
                    <li><Link to="/show/project/projex">Proj3</Link></li>
                    <li><Link to="/show/project/projex">Proj4</Link></li>
                    <li>...</li>
                    <li><Link to="/show/project/projex">Proj10</Link></li>
                </ul>
            </div>
        );
    }
});
