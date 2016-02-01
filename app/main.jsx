import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, hashHistory} from "react-router";

import routes from "lib/routes";
import store from "lib/store";

const App = (
    <Provider store={store}>
        <Router history={hashHistory}>
            {routes}
        </Router>
    </Provider>
);

render(App, document.getElementById("root"));
