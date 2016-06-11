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
            items: ["nothing"]
        };
    },

    componentWillAppear: function(cb) {
        console.log("c will appear");
        cb();
    },

    componentWillEnter: function(cb) {
        console.log("c will enter");
        cb();
    },

    componentWillLeave: function(cb) {
        console.log("c will leave");
        cb();
    },

    componentWillReceiveProps: function(nextProps) {
        this.updateItemList(nextProps.params.category);
    },

    componentDidMount: function() {
        console.log("contentlist mounted");
        this.updateItemList(this.props.params.category);
    },

    render: function() {
        return (
            <ContentListView {...this.props.params} itemList={this.state.items}/>
        );
    }
});
