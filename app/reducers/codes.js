import {map} from "ramda";

import {DROP_CODES_COLLECTION_SUCCESS} from "actions/drop-codes-collection";
import {GET_CODES_COLLECTION_SUCCESS} from "actions/get-codes-collection";
import {
    GET_CODE_STATS_START,
    GET_CODE_STATS_SUCCESS,
    GET_CODE_STATS_ERROR
} from "actions/get-code-stats";
import {SHORTEN_URL_SUCCESS, SHORTENED_URL_AGED} from "actions/shorten-url";

export default function codes (state = {}, {type, payload, meta}) {
    switch (type) {
    case DROP_CODES_COLLECTION_SUCCESS:
        return {};
    case GET_CODES_COLLECTION_SUCCESS:
        return map(code => ({
            ...code,
            fetchingStats: false,
            errorFetchingStats: null,
            newlyCreated: false,
            stats: null
        }), payload);
    case GET_CODE_STATS_START:
        return {
            ...state,
            [meta.code]: {
                ...state[meta.code],
                fetchingStats: true,
                errorFetchingStats: null,
                stats: null
            }
        };
    case GET_CODE_STATS_SUCCESS:
        return {
            ...state,
            [meta.code]: {
                ...state[meta.code],
                fetchingStats: false,
                errorFetchingStats: null,
                stats: payload
            }
        };
    case GET_CODE_STATS_ERROR:
        return {
            ...state,
            [meta.code]: {
                ...state[meta.code],
                fetchingStats: false,
                errorFetchingStats: payload,
                stats: null
            }
        };
    case SHORTEN_URL_SUCCESS:
        return {
            ...state,
            [payload.code]: {
                ...payload,
                fetchingStats: false,
                errorFetchingStats: null,
                newlyCreated: true,
                stats: null
            }
        };
    case SHORTENED_URL_AGED:
        return {
            ...state,
            [payload.code]: {
                ...state[payload.code],
                newlyCreated: false
            }
        };
    default:
        return state;
    }
}
