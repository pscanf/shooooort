import axios from "axios";
import chai, {expect} from "chai";
import nock from "nock";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import getCodeStats from "actions/get-code-stats";
import {
    GET_CODE_STATS_START,
    GET_CODE_STATS_SUCCESS,
    GET_CODE_STATS_ERROR
} from "actions/get-code-stats";
import axiosLib, {AxiosError} from "lib/axios";

chai.use(sinonChai);

describe("actions/get-code-stats", () => {

    describe("getCodeStats", () => {

        const dispatch = sinon.spy();
        const API_URL = "http://shooooort.com";
        const axiosInstance = axios.create({
            baseURL: API_URL,
            timeout: 5000
        });

        before(() => {
            axiosLib.__Rewire__("axiosInstance", axiosInstance);
            sinon.stub(console, "error");
        });
        after(() => {
            axiosLib.__ResetDependency__("axiosInstance");
            console.error.restore();
        });
        beforeEach(() => {
            nock.cleanAll();
            console.error.reset();
            dispatch.reset();
        });

        it("dispatches a GET_CODE_STATS_START action right away", async () => {
            await getCodeStats("codeId")(dispatch);
            const dispatchFirstCall = dispatch.getCall(0);
            expect(dispatchFirstCall.args[0]).to.deep.equal({
                type: GET_CODE_STATS_START,
                meta: {code: "codeId"}
            });
        });

        it("get stats for the supplied code from the server", async () => {
            const shooooort = nock("http://shooooort.com")
                .get("/codeId/stats")
                .reply(200, {});
            await getCodeStats("codeId")(dispatch);
            shooooort.done();
        });

        it("dispatches a GET_CODE_STATS_SUCCESS action on stats request success", async () => {
            const shooooort = nock("http://shooooort.com")
                .get("/codeId/stats")
                .reply(200, {
                    redirectCount: 1,
                    lastSeenDate: "2016-01-31T14:39:50.419Z",
                    startDate: "2016-01-31T14:39:45.892Z"
                });
            await getCodeStats("codeId")(dispatch);
            shooooort.done();
            expect(dispatch).to.have.been.calledWith({
                type: GET_CODE_STATS_SUCCESS,
                payload: {
                    redirectCount: 1,
                    lastSeenDate: "2016-01-31T14:39:50.419Z",
                    startDate: "2016-01-31T14:39:45.892Z"
                },
                meta: {
                    code: "codeId"
                }
            });
        });

        it("dispatches a GET_CODE_STATS_ERROR action on stats request error [CASE: http request error]", async () => {
            const shooooort = nock("http://shooooort.com")
                .get("/codeId/stats")
                .replyWithError("Request error");
            await getCodeStats("codeId")(dispatch);
            shooooort.done();
            expect(dispatch).to.have.been.calledWith({
                type: GET_CODE_STATS_ERROR,
                payload: sinon.match.instanceOf(AxiosError),
                error: true,
                meta: {
                    code: "codeId"
                }
            });
        });

        it("dispatches a GET_CODE_STATS_ERROR action on stats request error [CASE: http response error]", async () => {
            const shooooort = nock("http://shooooort.com")
                .get("/codeId/stats")
                .reply(400, "Bad request");
            await getCodeStats("codeId")(dispatch);
            shooooort.done();
            expect(dispatch).to.have.been.calledWith({
                type: GET_CODE_STATS_ERROR,
                payload: sinon.match.instanceOf(AxiosError),
                error: true,
                meta: {
                    code: "codeId"
                }
            });
        });

        it("doesn't dispatch a GET_CODE_STATS_ERROR action on dispatch errors", async () => {
            const dispatch = sinon.stub().throws(
                new Error("Error message")
            );
            await getCodeStats("codeId")(dispatch);
            expect(dispatch).to.have.callCount(1);
            expect(dispatch).to.have.been.calledWith({
                type: GET_CODE_STATS_START,
                meta: {code: "codeId"}
            });
        });

        it("logs dispatch errors", async () => {
            const dispatch = sinon.stub().throws(
                new Error("Error message")
            );
            await getCodeStats("codeId")(dispatch);
            expect(console.error).to.have.callCount(1);
            const error = console.error.getCall(0).args[0];
            expect(error.message).to.equal("Error message");
        });

    });

});
