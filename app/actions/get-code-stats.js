import {resolve} from "bluebird";

import axios, {AxiosError} from "lib/axios";

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
                *   `axios.get` fails (the error is an AxiosError). In all other
                *   cases we rethrow the error.
                */
                if (err instanceof AxiosError) {
                    dispatch({
                        type: GET_CODE_STATS_ERROR,
                        payload: err,
                        error: true,
                        meta: {code}
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
