import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import getCodesCollection from "actions/get-codes-collection";
import {GET_CODES_COLLECTION_SUCCESS} from "actions/get-codes-collection";
import * as codesCollection from "lib/codes-collection";

chai.use(sinonChai);

describe("actions/get-codes-collection", () => {

    describe("getCodesCollection", () => {

        const dispatch = sinon.spy();
        const getCodeStats = sinon.spy();

        before(() => {
            const LOCALSTORAGE_KEY = codesCollection.__GetDependency__("LOCALSTORAGE_KEY");
            global.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
                codeId: {
                    code: "codeId",
                    url: "url"
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl"
                }
            }));
        });
        beforeEach(() => {
            dispatch.reset();
            getCodeStats.reset();
            getCodesCollection.__Rewire__("getCodeStats", getCodeStats);
        });
        afterEach(() => {
            getCodesCollection.__ResetDependency__("getCodeStats");
        });

        it("dispatches a GET_CODES_COLLECTION_SUCCESS with the collection as payload", async () => {
            await getCodesCollection()(dispatch);
            const dispatchFirstCall = dispatch.getCall(0);
            expect(dispatchFirstCall.args[0]).to.deep.equal({
                type: GET_CODES_COLLECTION_SUCCESS,
                payload: {
                    codeId: {
                        code: "codeId",
                        url: "url"
                    },
                    anotherCodeId: {
                        code: "anotherCodeId",
                        url: "anotherUrl"
                    }
                }
            });
        });

        it("dispatches a getCodeStats action for each code in the database", async () => {
            await getCodesCollection()(dispatch);
            expect(getCodeStats).to.have.callCount(2);
            expect(getCodeStats).to.have.been.calledWith("codeId");
            expect(getCodeStats).to.have.been.calledWith("anotherCodeId");
        });

    });

});
