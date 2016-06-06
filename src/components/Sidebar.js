import React from "react";
import NavLink from "components/NavLink";

export default React.createClass({
    render() {
        return (
            <div>
                <div>
                    <ul role="nav">
                        <li><NavLink to="">Option1</NavLink></li>
                        <li><NavLink to="">Option2</NavLink></li>
                        <li><NavLink to="">Option3</NavLink></li>
                        <li><NavLink to="">Option4</NavLink></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
});
