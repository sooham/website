import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render: function() {
        const item = this.props.item;
        const category = this.props.category;
        return (
            <div>
                <div>
                    <Link to={`/${category}`}>Back</Link>
                </div>
                <header>
                    <h2>{item.title}</h2>
                    <p>{(item.date || item.from) || ""}</p>
                </header>
                <article>
                    {item.content || ""}
                </article>
            </div>
        );
    }
});
