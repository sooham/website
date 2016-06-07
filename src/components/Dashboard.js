import React from "react";
import { Link } from "react-router";

import data from "utils/data";

import "styles/app.css";

export default React.createClass({
    render: function() {
        const categories = data.getAll();
        return (
           <div className="Sidebar">
                <h1>Sooham_Rafiz</h1>
                <ul role="nav">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link to={`/${category.name}/`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
           </div>
        );
    }
});
