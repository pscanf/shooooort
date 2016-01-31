import React from "react";
import {IndexRoute, Route} from "react-router";

import Root from "views/root";
import Home from "views/home";

export default (
    <Route component={Root} path="/">
        <IndexRoute component={Home} />
    </Route>
);
