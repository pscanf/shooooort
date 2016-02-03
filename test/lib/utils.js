import {expect} from "chai";

import {timeago, urlIsValid} from "lib/utils";

describe("timeago", () => {

    it("returns `a few seconds ago` when passed null", () => {
        expect(
            timeago(null)
        ).to.equal("a few seconds ago");
    });

});

describe("urlIsValid", () => {

    it("false on invalid url", () => {
        expect(
            urlIsValid("invalidUrl")
        ).to.equal(false);
    });

    it("false on valid url without http or https protocol string", () => {
        expect(
            urlIsValid("valid-without-protocol.com")
        ).to.equal(false);
        expect(
            urlIsValid("ftp://valid-with-wrong-protocol.com")
        ).to.equal(false);
    });

    it("true on valid url with http or https protocol string", () => {
        expect(
            urlIsValid("https://valid-with-valid-protocol.com")
        ).to.equal(true);
        expect(
            urlIsValid("http://valid-with-valid-protocol.com")
        ).to.equal(true);
    });

});
