import {expect} from "chai";

import * as codesCollection from "lib/codes-collection";

describe("lib/codes-collection", () => {

    const LOCALSTORAGE_KEY = codesCollection.__GetDependency__("LOCALSTORAGE_KEY");
    beforeEach(() => {
        global.localStorage.clear();
    });

    describe("get", () => {
        it("gets the codes db", () => {
            global.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
                key: "value"
            }));
            expect(codesCollection.get()).to.deep.equal({key: "value"});
        });
        it("returns an empty object if there is no db", () => {
            expect(codesCollection.get()).to.deep.equal({});
        });
    });

    describe("insert", () => {
        it("inserts the supplied code into the db", () => {
            global.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
                codeId: {
                    code: "codeId",
                    url: "url"
                }
            }));
            codesCollection.insert({code: "anotherCodeId", url: "anotherUrl"});
            expect(codesCollection.get()).to.deep.equal({
                codeId: {
                    code: "codeId",
                    url: "url"
                },
                anotherCodeId: {
                    code: "anotherCodeId",
                    url: "anotherUrl"
                }
            });
        });
    });

    describe("drop", () => {
        it("resets the db", () => {
            global.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
                codeId: {
                    code: "codeId",
                    url: "url"
                }
            }));
            codesCollection.drop();
            expect(codesCollection.get()).to.deep.equal({});
        });
    });

});
