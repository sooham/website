import React from "react";
import { Link } from "react-router";

import styles from "styles/itemView.module.css";

export default React.createClass({

    render: function() {
        const item = this.props.item;
        const category = this.props.category;
        return (
            <div className={styles.item}>
                <article>
                    <div className={styles.backLink}>
                        <Link to={`/${category}`}>Back</Link>
                    </div>
                    <header className={styles.itemHeader}>
                        <h2>{item.title}</h2>
                        <p>{(item.date || item.from) || ""}</p>
                    </header>
                    <section className={styles.itemBody}>
                        {item.content || ""}
                    </section>
                </article>
            </div>
        );
    }
});
