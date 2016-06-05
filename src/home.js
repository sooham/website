import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import homeRoutes from "routes/home";

render((
    <Router routes={homeRoutes} history={browserHistory}/>
), document.getElementById("app"));

