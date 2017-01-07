// @flow

import React from "react";
import Route from "react-router/lib/Route";
import IndexRoute from "react-router/lib/IndexRoute";
import Redirect from "react-router/lib/Redirect";

import Dashboard from "components/Dashboard";
import Root from "components/Root";
import Blog from "components/Blog";
import BlogPost from "components/BlogPost";
import About from "components/About";
import Page404 from "components/Page404";

// TODO: code splitting in both webpack and react
// TODO: use strict pls
// TODO: isomorphic rendering for login and editor

module.exports  = (
    <Route component={Root}>
        // TODO: redirect to /blog when / if mobile
        <Route path="/" component={Dashboard}>
            <Route path="blog">
                <IndexRoute component={Blog}/>
                <Route path=":post" component={BlogPost}/>
            </Route>
            <Route path="about" component={About}/>
            // TODO: add art route
            <Route path='404' component={Page404}/>
            <Redirect from='*' to='404'/>
        </Route>
    </Route>
);
