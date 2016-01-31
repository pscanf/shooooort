import {expect} from "chai";

import dropCodesCollection from "actions/drop-codes-collection";
import {DROP_CODES_COLLECTION_SUCCESS} from "actions/drop-codes-collection";
import * as codesCollection from "lib/codes-collection";

describe("actions/drop-codes-collection", () => {

    describe("dropCodesCollection", () => {

        const LOCALSTORAGE_KEY = codesCollection.__GetDependency__("LOCALSTORAGE_KEY");
        beforeEach(() => {
            global.localStorage.clear();
        });

        it("drops the collection from localStorage", () => {
            global.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
                key: "value"
            }));
            dropCodesCollection();
            expect(codesCollection.get()).to.deep.equal({});
        });

        it("returns a DROP_CODES_COLLECTION_SUCCESS with the new (empty) collection as payload", () => {
            expect(dropCodesCollection()).to.deep.equal({
                type: DROP_CODES_COLLECTION_SUCCESS,
                payload: {}
            });
        });

    });

});
