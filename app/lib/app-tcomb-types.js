import {t} from "tcomb-react";
import {isISO8601, isURL} from "validator";

export const ISO8601String = t.refinement(t.String, isISO8601);
export const URLString = t.refinement(t.String, isURL);

export const Code = t.struct({
    code: t.String,
    url: URLString,
    fetchingStats: t.Boolean,
    errorFetchingStats: t.maybe(t.Object),
    stats: t.maybe(t.struct({
        startDate: ISO8601String,
        lastSeenDate: ISO8601String,
        redirectCount: t.Number
    }))
}, "Code");

export const CodesCollection = t.dict(t.String, Code, "CodesCollection");
