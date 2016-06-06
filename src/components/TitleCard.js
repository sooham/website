import React from "react";

import NavLink from "components/NavLink";

export default React.createClass({
    render() {
        return (
            <div>
                <NavLink to="/" onlyActiveOnIndex>
                    <h2>Sooham_Rafiz</h2>
                </NavLink>
                {this.props.children}
            </div>
        );
    }
});
