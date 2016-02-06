import React from "react";
import {IndexRoute, Route, Router, hashHistory} from "react-router";

import Root from "views/root";
import Home from "views/home";

export default (
    <Router history={hashHistory}>
        <Route component={Root} path="/">
            <IndexRoute component={Home} />
        </Route>
    </Router>
);
