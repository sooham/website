import React from "react";
import data from "utils/data";
import $ from "jquery";

import ContentListView from "components/ContentListView";

import styles from "styles/dashboard.module.css";


// TODO: move to containers/
// TODO: add proptypes and default props and what not
export default React.createClass({
    updateItemList: function(category) {
        const cat = data.lookupCategory(category);
        const itemList = cat ? Object.keys(cat.itemsMap): ["nothing"];

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
    // TODO: you'll need to pass a state down from parent to child,
    // seems like the most effective way to fix this issue

    componentWillAppear: function (cb) {
        $(document).ready(() => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $("#indexNav").width("30%");
            }
            cb();
        });
    },

    componentWillEnter: function(cb) {
        $(document).ready(() => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $("#indexNav").animate(
                    {width: "30%"}, 400
                    );
            }
            cb();
        });
    },

    componentWillLeave: function(cb) {
        $(document).ready(() => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $("#indexNav").animate(
                    {width: "100%"}, 400
                    );
            }
            cb();
        });
    },

    componentWillReceiveProps: function(nextProps) {
        this.updateItemList(nextProps.params.category);
    },

    componentDidMount: function() {
        this.updateItemList(this.props.params.category);
    },

    render: function() {
        console.log("rendering: " + this.props.params.category);
        return (
            <ContentListView {...this.props.params} itemList={this.state.items}/>
        );
    }
});
