import React from "react";
import data from "utils/data";
import $ from "jquery";

import ItemView from "components/ItemView";

// TODO: move to containers/
// TODO: add proptypes and default props and what not
export default React.createClass({
    updateItem: function (category, item) {
        this.setState({
            "item": data.lookupItem(category, item) || {title: "nothing"}
        });
    },

    getInitialState: function() {
        return {
            item: {title: "nothing"}
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


    componentDidMount: function() {
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
