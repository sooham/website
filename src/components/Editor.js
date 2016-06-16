import React from "react";
import $ from "jquery";

export default React.createClass({

    getInitialState: function () {
        return {
            isLoggedIn: false,
            name: "anon",
            imageUrl: ""
        };
    },

    componentDidMount: function() {
    },

    render: function() {
        var userImage = this.state.isLoggedIn ? (<img src={this.state.imageUrl}/>) : (<div></div>);
        return (
            <div>
                <h1>This is the editor</h1>
                {userImage}
                <h3>Welcome {this.state.name}!</h3>
            </div>
        );
    }
});
