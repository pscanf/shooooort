import {reject, resolve} from "bluebird";
import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import getCodeStats from "actions/get-code-stats";
import {
    GET_CODE_STATS_START,
    GET_CODE_STATS_SUCCESS,
    GET_CODE_STATS_ERROR
} from "actions/get-code-stats";
import {AxiosError} from "lib/axios";

chai.use(sinonChai);

describe("actions/get-code-stats", () => {

    describe("getCodeStats", () => {

        const axios = {};
        const dispatch = sinon.spy();

        before(() => {
            getCodeStats.__Rewire__("axios", axios);
            sinon.stub(console, "error");
        });
        after(() => {
            getCodeStats.__ResetDependency__("axios");
            console.error.restore();
        });
        beforeEach(() => {
            console.error.reset();
            axios.get = sinon.stub().returns(resolve({}));
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
            await getCodeStats("codeId")(dispatch);
            expect(axios.get).to.have.callCount(1);
            expect(axios.get).to.have.been.calledWith("/codeId/stats");
        });

        it("dispatches a GET_CODE_STATS_SUCCESS action on stats request success", async () => {
            axios.get = sinon.stub().returns(resolve({
                data: {
                    redirectCount: 1,
                    lastSeenDate: "2016-01-31T14:39:50.419Z",
                    startDate: "2016-01-31T14:39:45.892Z"
                }
            }));
            await getCodeStats("codeId")(dispatch);
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

        it("dispatches a GET_CODE_STATS_ERROR action on stats request error", async () => {
            axios.get = sinon.stub().returns(reject(
                new AxiosError()
            ));
            await getCodeStats("codeId")(dispatch);
            expect(dispatch).to.have.been.calledWith({
                type: GET_CODE_STATS_ERROR,
                payload: new AxiosError(),
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
