import {resolve} from "bluebird";

import axios from "lib/axios";

export const GET_CODE_STATS_START = "GET_CODE_STATS_START";
export const GET_CODE_STATS_SUCCESS = "GET_CODE_STATS_SUCCESS";
export const GET_CODE_STATS_ERROR = "GET_CODE_STATS_ERROR";

export default function getCodeStats (code) {
    return dispatch => {
        return resolve()
            .then(() => {
                dispatch({
                    type: GET_CODE_STATS_START,
                    meta: {code}
                });
                return axios.get(`/${code}/stats`);
            })
            .then(res => {
                dispatch({
                    type: GET_CODE_STATS_SUCCESS,
                    payload: res.data,
                    meta: {code}
                });
            })
            .catch(err => {
                /*
                *   We want to dispatch a GET_CODE_STATS_ERROR action only when
                *   `axios.get` fails. If the error occurred while dispatching,
                *   we only rethrow it to be logged in the final catch.
                *   Since errors thrown by axios are not Error instances, we can
                *   use that fact to discriminate between axios errors and
                *   dispatch errors.
                */
                if (err instanceof Error) {
                    throw err;
                }
                dispatch({
                    type: GET_CODE_STATS_ERROR,
                    payload: err,
                    error: true,
                    meta: {code}
                });
            })
            .catch(err => {
                console.error(err);
            });
    };
}
