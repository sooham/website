import React from "react";
import data from "utils/data";

import ItemView from "components/ItemView";

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
        const { category, item } = this.props.params;
        this.updateItem(category, item);
    },

    componentWillReceiveProps: function(nextProps) {
        const { category, item } = nextProps.params;
        this.updateItem(category, item);
    },

    render: function() {
        return (<ItemView {...this.props.params} item={this.state.item}/>);
    }
});
