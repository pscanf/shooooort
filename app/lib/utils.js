import moment from "moment";
import {isURL} from "validator";

export function timeago (date) {
    return moment(date).fromNow();
}

export function urlIsValid (url) {
    return isURL(url, {
        protocols: ["http", "https"],
        require_protocol: true,
        require_valid_protocol: true
    });
}
