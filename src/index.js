// @flow

import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import indexRoutes from "routes/indexRoutes";


render((
    <Router routes={indexRoutes} history={browserHistory}/>
), document.getElementById("app"));
