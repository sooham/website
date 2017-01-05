// @flow

import React from "react";
import Route from "react-router/lib/Route";
import IndexRoute from "react-router/lib/IndexRoute";

import Dashboard from "components/Dashboard";
import Root from "components/Root";
import loginPane from "components/loginPane";
import Blog from "components/Blog"
import BlogPost from "components/BlogPost"
import About from "components/About"

// TODO: code splitting in both webpack and react
// TODO: use strict pls
// TODO: isomorphic rendering for login and editor

module.exports = (
    <Route component={Root}>
        <Route path="/editor" component={loginPane}/>
        // TODO: make this index route
        <Route path="/" component={Dashboard}>
            <Route path="blog">
                <IndexRoute component={Blog}/>
                <Route path=":post" component={BlogPost}/>
            </Route>
            <Route path="about" component={About}/>
            // TODO: add art route
        </Route>
    </Route>
);
