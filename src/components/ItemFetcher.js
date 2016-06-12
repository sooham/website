import React from "react";
import data from "utils/data";
import $ from "jquery";

import ItemView from "components/ItemView";

import styles from "styles/dashboard.module.css";

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

        // TODO: did a quick and dirty fix to enable animation when user
    // does not start at /, clean this up by including a state in this component
    // should these be with the parent?
    // TODO: you'll need to pass a state down from parent to child,
    // seems like the most effective way to fix this issue

    componentWillAppear: function (cb) {
        console.log("i will appear");
        $(document).ready(() => {
            $(`#${styles.indexNav}`).width("30%");
            cb();
        });
    },

    componentWillEnter: function(cb) {
        console.log("i will enter");
        $(document).ready(() => {
            $(`#${styles.indexNav}`).animate(
                {width: "30%"}, 400
                );
            cb();
        });
    },

    componentWillLeave: function(cb) {
        console.log("i will leave");
        $(document).ready(() => {
            $(`#${styles.indexNav}`).animate(
                {width: "100%"}, 400
                );
            cb();
        });
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
