import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import routes from "lib/routes";
import store from "lib/store";

const App = (
    <Provider store={store}>
        {routes}
    </Provider>
);

render(App, document.getElementById("root"));
