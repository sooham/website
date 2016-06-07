import React from "react";
import data from "utils/data";

export default React.createClass({
    render: function() {
        const { category, item } = this.props.params;
        const menuItem = data.lookupItem(category, item);

        return (
            <div>
                <h1>{menuItem.name}</h1>
                <p>{menuItem.content}</p>
            </div>
        );
    }
});
