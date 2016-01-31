import {resolve} from "bluebird";
import axios from "lib/axios";

import {insert} from "lib/codes-collection";

export const SHORTEN_URL_START = "SHORTEN_URL_START";
export const SHORTEN_URL_SUCCESS = "SHORTEN_URL_SUCCESS";
export const SHORTEN_URL_ERROR = "SHORTEN_URL_ERROR";

export default function shortenUrl (url) {
    return dispatch => {
        return resolve()
            .then(() => {
                dispatch({type: SHORTEN_URL_START});
                return axios.post("/shorten", {url});
            })
            .then(res => {
                const code = {
                    code: res.data.shortcode,
                    url: url
                };
                insert(code);
                dispatch({type: SHORTEN_URL_SUCCESS, payload: code});
            })
            .catch(err => {
                /*
                *   We want to dispatch a SHORTEN_URL_ERROR action only when
                *   `axios.post` fails. If the error occurred while dispatching,
                *   we only rethrow it to be logged in the final catch.
                *   Since errors thrown by axios are not Error instances, we can
                *   use that fact to discriminate between axios errors and
                *   dispatch errors.
                */
                if (err instanceof Error) {
                    throw err;
                }
                dispatch({type: SHORTEN_URL_ERROR, payload: err, error: true});
            })
            .catch(err => {
                console.error(err);
            });
    };
}
