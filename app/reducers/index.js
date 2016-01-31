import {combineReducers} from "redux";
import {routeReducer as routing} from "react-router-redux";

import codes from "reducers/codes";

export default combineReducers({
    codes,
    routing
});
