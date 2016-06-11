import React from "react";
import data from "utils/data";

import ItemView from "components/ItemView";

// TODO: move to containers/
// TODO: add proptypes and default props and what not
export default React.createClass({
    updateItem: function (category, item) {
        this.setState({
            "item": data.lookupItem(category, item)
        });
    },

    getInitialState: function() {
        return {
            item: {}
        };
    },

    componentDidMount: function() {
        console.log("itemlist mounted");
        const { category, item } = this.props.params;
        this.updateItem(category, item);
    },

    componentWillReceiveProps: function(nextProps) {
        const { category, item } = nextProps.params;
        this.updateItem(category, item);
    },

    render: function() {
        return (
            <ItemView {...this.props.params} item={this.state.item}/>
        );
    }
});
