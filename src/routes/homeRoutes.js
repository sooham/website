import React from "react";
import { Route, IndexRoute } from "react-router";

import Blog from "components/Blog";
import BlogPost from "components/BlogPost";
import Dashboard from "components/Dashboard";
import DemoShowcase from "components/DemoShowcase";
import Project from "components/Project";
import ProjectPost from "components/ProjectPost";
import Sidebar from "components/Sidebar";
import Tags from "components/Tags";
import TitleCard from "components/TitleCard";

// TODO: there is a /show route to reslove a sidebar applet
// remove the show route and find a better way to integrate
// sidebar

// TODO: how to control Sidebar contents from its children
// or should the side bar be the child instead of parent
module.exports = (
    <Route path="/"  component={TitleCard}>
        <IndexRoute                     component={Dashboard}/>
        <Route path="/show"             component={Sidebar}>
            <Route path="/show/blog/p/:page"    component={Blog}/>
            <Route path="/show/blog/:title"     component={BlogPost}/>

            <Route path="/show/tags"            component={Tags}/>

            <Route path="/show/projects"        component={Project}/>
            <Route path="/show/projects/:title" component={ProjectPost}/>

            <Route path="/show/demos/:title"    component={DemoShowcase}/>
        </Route>
    </Route>
);
