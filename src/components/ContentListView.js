import React from "react";
import { Link } from "react-router";

import styles from "styles/contentListView.module.css";

export default React.createClass({

    render: function() {
        const category = this.props.category;
        return (
            <div className={styles.contentList}>
                <ul role="nav">
                    {
                        this.props.itemList.map(function(item, index) {
                            return (
                                <Link key={index} to={`${category}/${item}`}>
                                    <li>
                                        <h2>{item}</h2>
                                    </li>
                                </Link>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});
