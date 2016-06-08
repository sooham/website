import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render: function() {
        const category = this.props.category;
        return (
            <ul role="nav">
                {
                    this.props.itemList.map(function(item, index) {
                        return (
                            <li key={index}>
                                <Link to={`${category}/${item}`}>
                                    <h2>{item}</h2>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});
