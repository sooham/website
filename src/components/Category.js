import React from "react";
import data from "utils/data";
import { Link } from "react-router";

import "styles/app.css";

export default  React.createClass({
    render: function () {
        const category = data.lookupCategory(this.props.params.category);

        return (
            <div>
                <div className="Sidebar">
                    <Link to="/">◀︎ Back</Link>
                    <h2>{category.name} Items</h2>
                    <ul>
                        {category.items.map((item, index) => (
                            <li key={index}>
                                <Link to={`/${category.name}/${item.name}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Content">
                    <h1>{category.name}</h1>
                    {this.props.children || (<p>{category.description}</p>)}
                </div>
            </div>
        );
    }
});
