import {drop, get} from "lib/codes-collection";

export const DROP_CODES_COLLECTION_SUCCESS = "DROP_CODES_COLLECTION_SUCCESS";

export default function dropCodesCollection () {
    drop();
    return {
        type: DROP_CODES_COLLECTION_SUCCESS,
        payload: get()
    };
}
