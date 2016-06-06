import React from "react";

export default React.createClass({
    render() {
        return (
            <div>
                <div>
                    <ul role="nav">
                        <li>Option1</li>
                        <li>Option2</li>
                        <li>Option3</li>
                        <li>Option4</li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
});
