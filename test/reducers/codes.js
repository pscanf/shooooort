import {expect} from "chai";

import {DROP_CODES_COLLECTION_SUCCESS} from "actions/drop-codes-collection";
import {GET_CODES_COLLECTION_SUCCESS} from "actions/get-codes-collection";
import {
    GET_CODE_STATS_START,
    GET_CODE_STATS_SUCCESS,
    GET_CODE_STATS_ERROR
} from "actions/get-code-stats";
import {SHORTEN_URL_SUCCESS, SHORTENED_URL_AGED} from "actions/shorten-url";

import codes from "reducers/codes";

describe("reducers/codes", () => {

    describe("codes", () => {

        it("case DROP_CODES_COLLECTION_SUCCESS", () => {
            const state = {
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            };
            const action = {
                type: DROP_CODES_COLLECTION_SUCCESS
            };
            expect(codes(state, action)).to.deep.equal({});
        });

        it("case GET_CODES_COLLECTION_SUCCESS", () => {
            const state = {};
            const action = {
                type: GET_CODES_COLLECTION_SUCCESS,
                payload: {
                    codeId: {
                        code: "codeId",
                        url: "url"
                    }
                }
            };
            expect(codes(state, action)).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            });
        });

        it("case GET_CODE_STATS_START", () => {
            const state = {
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            };
            const action = {
                type: GET_CODE_STATS_START,
                meta: {
                    code: "codeId"
                }
            };
            expect(codes(state, action)).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: true,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            });
        });

        it("case GET_CODE_STATS_SUCCESS", () => {
            const state = {
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: true,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            };
            const action = {
                type: GET_CODE_STATS_SUCCESS,
                payload: {
                    redirectCount: 1,
                    lastSeenDate: "2016-01-31T14:39:50.419Z",
                    startDate: "2016-01-31T14:39:45.892Z"
                },
                meta: {
                    code: "codeId"
                }
            };
            expect(codes(state, action)).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: {
                        redirectCount: 1,
                        lastSeenDate: "2016-01-31T14:39:50.419Z",
                        startDate: "2016-01-31T14:39:45.892Z"
                    }
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            });
        });

        it("case GET_CODE_STATS_ERROR", () => {
            const state = {
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: true,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            };
            const action = {
                type: GET_CODE_STATS_ERROR,
                payload: new Error("Error message"),
                meta: {
                    code: "codeId"
                }
            };
            expect(codes(state, action)).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: new Error("Error message"),
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            });
            expect(
                codes(state, action).codeId.errorFetchingStats.message
            ).to.equal("Error message");
        });

        it("case SHORTEN_URL_SUCCESS", () => {
            const state = {
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            };
            const action = {
                type: SHORTEN_URL_SUCCESS,
                payload: {
                    code: "anotherCodeId",
                    url: "anotherUrl"
                }
            };
            expect(codes(state, action)).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: true,
                    stats: null
                }
            });
        });

        it("case SHORTENED_URL_AGED", () => {
            const state = {
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: true,
                    stats: null
                }
            };
            const action = {
                type: SHORTENED_URL_AGED,
                payload: {
                    code: "codeId",
                    url: "url"
                }
            };
            expect(codes(state, action)).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url",
                    fetchingStats: false,
                    errorFetchingStats: null,
                    newlyCreated: false,
                    stats: null
                }
            });
        });

        it("case default", () => {
            const state = {};
            const action = {
                type: "UNKNOWN"
            };
            expect(codes(state, action)).to.equal(state);
        });

    });

});
