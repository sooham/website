// @flow

import React from "react";
import { Route, IndexRoute } from "react-router";

import ContentListFetcher from "components/ContentListFetcher";
import Dashboard from "components/Dashboard";
import ItemFetcher from "components/ItemFetcher";

module.exports = (
    <Route path="/" component={Dashboard}>
        <Route path=":category" component={ContentListFetcher}/>
        <Route path=":category/:item" component={ItemFetcher}/>
    </Route>
);
