import {resolve} from "bluebird";
import axios, {AxiosError} from "lib/axios";

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
                *   We want to dispatch a GET_CODE_STATS_ERROR action only when
                *   `axios.post` fails (the error is an AxiosError). In all
                *   other cases we rethrow the error.
                */
                if (err instanceof AxiosError) {
                    dispatch({
                        type: SHORTEN_URL_ERROR,
                        payload: err,
                        error: true
                    });
                } else {
                    throw err;
                }
            })
            .catch(err => {
                /*
                *   We cannot recover from a dispatch error. Therefore we
                *   only log it.
                */
                console.error(err);
            });
    };
}
