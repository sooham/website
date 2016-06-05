import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import adminRoutes from "routes/admin";

render((
    <Router routes={adminRoutes} history={browserHistory}/>
), document.getElementById("app"));
