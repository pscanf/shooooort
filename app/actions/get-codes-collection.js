import {values} from "ramda";

import getCodeStats from "actions/get-code-stats";
import {get} from "lib/codes-collection";

export const GET_CODES_COLLECTION_SUCCESS = "GET_CODES_COLLECTION_SUCCESS";

export default function getCodesCollection () {
    return async dispatch => {
        const codesCollection = get();
        dispatch({
            type: GET_CODES_COLLECTION_SUCCESS,
            payload: codesCollection
        });
        values(codesCollection).forEach(code => dispatch(
            getCodeStats(code.code)
        ));
    };
}
