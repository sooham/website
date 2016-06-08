import React from "react";
import data from "utils/data";

import ContentListView from "components/ContentListView";

// TODO: move to containers/
// TODO: add proptypes and default props and what not
export default React.createClass({
    updateItemList: function(category) {
        const itemList = Object.keys(data.lookupCategory(category).itemsMap);
        this.setState({
            items: itemList
        });
    },
    getInitialState: function() {
        return {
            items: []
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.updateItemList(nextProps.params.category);
    },

    componentDidMount: function() {
        this.updateItemList(this.props.params.category);
    },

    render: function() {
        return (<ContentListView {...this.props.params} itemList={this.state.items}/>);
    }
});
