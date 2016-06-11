import React from "react";
import data from "utils/data";

import ContentListView from "components/ContentListView";

import styles from "styles/dashboard.module.css";

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

    // TODO: did a quick and dirty fix to enable animation when user
    // does not start at /, clean this up by including a state in this component
    // should these be with the parent?

    componentDidAppear: function (cb) {
        console.log("will appear");
        $(`#${styles.indexNav}`).animate(
            {width: "30%"}, 400
            );
    },

    componentWillEnter: function(cb) {
        console.log("c will enter");
        $(`#${styles.indexNav}`).animate(
            {width: "30%"}, 400
            );
        cb();
    },

    componentWillLeave: function(cb) {
        console.log("c will leave");
        $(`#${styles.indexNav}`).animate(
            {width: "100%"}, 400
            );
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
