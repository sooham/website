import React from "react";

export default React.createClass({
    render() {
        return (
            <div>
                <header>
                    <h2>Sooham_Rafiz</h2>
                </header>
                {this.props.children}
            </div>
        );
    }
});
