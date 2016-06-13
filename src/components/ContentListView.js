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
                                <li key={index}>
                                    <Link to={`${category}/${item}`}>
                                        <h2>{item}</h2>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});
