// @flow

import React from "react";
import { render } from "react-dom";
import Router from "react-router/lib/Router";
import browserHistory from "react-router/lib/browserHistory";
import indexRoutes from "routes/indexRoutes";


render((
    <Router routes={indexRoutes} history={browserHistory}/>
), document.getElementById("app"));
