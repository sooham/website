// @flow

import React from "react";
import Route from "react-router/lib/Route";
import IndexRoute from "react-router/lib/IndexRoute";

import ContentListFetcher from "components/ContentListFetcher";
import Dashboard from "components/Dashboard";
import ItemFetcher from "components/ItemFetcher";
import Root from "components/Root";
import Editor from "components/Editor";

module.exports = (
    <Route component={Root}>
        <Route path="/editor" component={Editor}/>
        <Route path="/" component={Dashboard}>
            <Route path=":category" component={ContentListFetcher}/>
            <Route path=":category/:item" component={ItemFetcher}/>
        </Route>
    </Route>
);
