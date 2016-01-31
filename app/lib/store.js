import {browserHistory} from "react-router";
import {syncHistory} from "react-router-redux";
import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "reducers";

const reduxRouterMiddleware = syncHistory(browserHistory);

const middleware = applyMiddleware(
    reduxRouterMiddleware,
    thunk,
    logger({collapsed: true})
);

export default compose(
    middleware
)(createStore)(rootReducer);
