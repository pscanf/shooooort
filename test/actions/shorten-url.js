import {reject, resolve} from "bluebird";
import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import shortenUrl from "actions/shorten-url";
import {
    SHORTEN_URL_START,
    SHORTEN_URL_SUCCESS,
    SHORTEN_URL_ERROR,
    SHORTENED_URL_AGED
} from "actions/shorten-url";
import {AxiosError} from "lib/axios";

chai.use(sinonChai);

describe("actions/shorten-url", () => {

    describe("shortenUrl", () => {

        const axios = {};
        const dispatch = sinon.spy();
        const insert = sinon.spy();

        beforeEach(() => {
            shortenUrl.__Rewire__("AGING_TIME_IN_MS", 0);
            shortenUrl.__Rewire__("axios", axios);
            shortenUrl.__Rewire__("insert", insert);
            sinon.stub(console, "error");
            axios.post = sinon.stub().returns(resolve({
                data: {
                    shortcode: "codeId"
                }
            }));
            dispatch.reset();
            insert.reset();
            console.error.reset();
        });
        afterEach(() => {
            shortenUrl.__ResetDependency__("AGING_TIME_IN_MS");
            shortenUrl.__ResetDependency__("axios");
            shortenUrl.__ResetDependency__("insert");
            console.error.restore();
        });

        it("dispatches a SHORTEN_URL_START action right away", async () => {
            await shortenUrl("url")(dispatch);
            const dispatchFirstCall = dispatch.getCall(0);
            expect(dispatchFirstCall.args[0]).to.deep.equal({
                type: SHORTEN_URL_START
            });
        });

        it("makes a post request to shorten the supplied url to the server", async () => {
            await shortenUrl("url")(dispatch);
            expect(axios.post).to.have.callCount(1);
            expect(axios.post).to.have.been.calledWith("/shorten", {
                url: "url"
            });
        });

        it("inserts the code to the codeCollection on shorten request success", async () => {
            await shortenUrl("url")(dispatch);
            expect(insert).to.have.been.calledWith({
                code: "codeId",
                url: "url"
            });
        });

        it("dispatches a SHORTEN_URL_SUCCESS action on shorten request success", async () => {
            await shortenUrl("url")(dispatch);
            expect(dispatch).to.have.been.calledWith({
                type: SHORTEN_URL_SUCCESS,
                payload: {
                    code: "codeId",
                    url: "url"
                }
            });
        });

        it("dispatches a SHORTENED_URL_AGED action AGING_TIME_IN_MS ms after the url has been shortened", async () => {
            shortenUrl.__Rewire__("AGING_TIME_IN_MS", 200);
            const start = Date.now();
            await shortenUrl("url")(dispatch);
            const end = Date.now();
            expect(dispatch).to.have.been.calledWith({
                type: SHORTENED_URL_AGED,
                payload: {
                    code: "codeId",
                    url: "url"
                }
            });
            expect(end - start).to.be.closeTo(200, 20);
        });

        it("dispatches a SHORTEN_URL_ERROR action on shorten request error", async () => {
            axios.post = sinon.stub().returns(reject(
                new AxiosError()
            ));
            await shortenUrl("url")(dispatch);
            expect(dispatch).to.have.been.calledWith({
                type: SHORTEN_URL_ERROR,
                payload: new AxiosError(),
                error: true
            });
        });

        it("doesn't dispatch a SHORTEN_URL_ERROR action on dispatch errors", async () => {
            const dispatch = sinon.stub().throws(
                new Error("Error message")
            );
            await shortenUrl("url")(dispatch);
            expect(dispatch).to.have.callCount(1);
            expect(dispatch).to.have.been.calledWith({
                type: SHORTEN_URL_START
            });
        });

        it("logs dispatch errors", async () => {
            const dispatch = sinon.stub().throws(
                new Error("Error message")
            );
            await shortenUrl("url")(dispatch);
            expect(console.error).to.have.callCount(1);
            const error = console.error.getCall(0).args[0];
            expect(error.message).to.equal("Error message");
        });

    });

});
