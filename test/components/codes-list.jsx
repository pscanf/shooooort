import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import {range, values} from "ramda";
import React from "react";
import TestUtils from "react-addons-test-utils";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import CodesList from "components/codes-list";

chai.use(jsxChai);
chai.use(sinonChai);

describe("components/codes-list", () => {

    describe("CodesList", () => {

        const codes = range(0, 10).reduce((codes, idx) => ({
            ...codes,
            [`code-${idx}`]: {
                code: `code-${idx}`,
                url: `http://url-${idx}.com`,
                fetchingStats: false,
                errorFetchingStats: null,
                newlyCreated: (idx % 2 === 0),
                stats: null
            }
        }), {});
        const component = TestUtils.renderIntoDocument(
            <CodesList codes={codes} />
        );
        const API_URL = "http://shooooort.com";
        const copy = sinon.spy();

        before(() => {
            CodesList.__Rewire__("API_URL", API_URL);
            CodesList.__Rewire__("copy", copy);
        });
        after(() => {
            CodesList.__ResetDependency__("API_URL");
            CodesList.__ResetDependency__("copy");
        });

        it("renders a table", () => {
            TestUtils.findRenderedDOMComponentWithTag(component, "table");
        });

        it("renders as many body table rows as there are codes", () => {
            const trs = TestUtils.scryRenderedDOMComponentsWithTag(component, "tr");
            // +1 tr in thead
            expect(trs.length).to.equal(values(codes).length + 1);
        });

        it("renders a visible highlight bar for newlyCreated codes", () => {
            TestUtils
                // Get all td-s
                .scryRenderedDOMComponentsWithTag(component, "td")
                // Keep only first child td-s
                .filter(td => td.previousElementSibling === null)
                // Keep only those for which newlyCreated === true
                .filter((td, idx) => idx % 2 === 0)
                // Test their highlight bar is visible (opacity === 1)
                .forEach(td => {
                    expect(td.firstChild.firstChild.style.opacity).to.equal("1");
                });
        });

        it("renders a non-visible highlight bar for newlyCreated codes", () => {
            TestUtils
                // Get all td-s
                .scryRenderedDOMComponentsWithTag(component, "td")
                // Keep only first child td-s
                .filter(td => td.previousElementSibling === null)
                // Keep only those for which newlyCreated === false
                .filter((td, idx) => idx % 2 !== 0)
                // Test their highlight bar is not visible (opacity === 0)
                .forEach(td => {
                    expect(td.firstChild.firstChild.style.opacity).to.equal("0");
                });
        });

        it("copies short link to clipboard when entry is clicked [CASE: click on tr]", () => {
            TestUtils
                // Get all rows
                .scryRenderedDOMComponentsWithTag(component, "tr")
                // Filter out head rows
                .filter(tr => tr.parentElement.tagName !== "THEAD")
                // Test click-to-copy
                .forEach((tr, idx) => {
                    copy.reset();
                    TestUtils.Simulate.click(tr);
                    expect(copy).to.have.callCount(1);
                    expect(copy).to.have.been.calledWith(`http://shooooort.com/code-${idx}`);
                });
        });

        it("copies short link to clipboard when entry is clicked [CASE: click on tr child]", () => {
            TestUtils
                // Get all rows
                .scryRenderedDOMComponentsWithTag(component, "tr")
                // Filter out head rows
                .filter(tr => tr.parentElement.tagName !== "THEAD")
                // Get child
                .map(tr => tr.firstChild.firstChild)
                // Test click-to-copy
                .forEach((tr, idx) => {
                    copy.reset();
                    TestUtils.Simulate.click(tr);
                    expect(copy).to.have.callCount(1);
                    expect(copy).to.have.been.calledWith(`http://shooooort.com/code-${idx}`);
                });
        });

    });

});
