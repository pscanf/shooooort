import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import {range, values} from "ramda";
import React from "react";
import TestUtils from "react-addons-test-utils";

import CodesList from "components/codes-list";

chai.use(jsxChai);

describe("components/codes-list", () => {

    describe("CodesList", () => {

        const codes = range(0, 10).reduce((codes, idx) => ({
            ...codes,
            [`code-${idx}`]: {
                code: `code-${idx}`,
                url: `http://url-${idx}.com`,
                fetchingStats: false,
                errorFetchingStats: null,
                stats: null
            }
        }), {});
        const component = TestUtils.renderIntoDocument(
            <CodesList codes={codes} />
        );

        it("renders a table", () => {
            TestUtils.findRenderedDOMComponentWithTag(component, "table");
        });

        it("renders as many body table rows as there are codes", () => {
            const trs = TestUtils.scryRenderedDOMComponentsWithTag(component, "tr");
            // +1 tr in thead
            expect(trs.length).to.equal(values(codes).length + 1);
        });

    });

});
