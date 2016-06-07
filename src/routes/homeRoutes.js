import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "components/App";
import Dashboard from "components/Dashboard";
import Category from "components/Category";
import Item from "components/Item";

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path=":category" component={Category}>
            <Route path=":item" component={Item} />
        </Route>
    </Route>
);
