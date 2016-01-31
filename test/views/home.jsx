import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import UrlForm from "components/url-form";
import Home from "views/home";

chai.use(jsxChai);
chai.use(sinonChai);

describe("components/home", () => {

    describe("Home", () => {

        const _Home = Home.__GetDependency__("Home");

        const codes = {
            codeId: {
                code: "codeId",
                url: "http://url.com",
                fetchingStats: false,
                errorFetchingStats: null,
                stats: null
            }
        };
        const dropCodesCollection = sinon.spy();
        const getCodesCollection = sinon.spy();
        const shortenUrl = sinon.spy();

        beforeEach(() => {
            dropCodesCollection.reset();
            getCodesCollection.reset();
            shortenUrl.reset();
        });

        it("drops the codes collection when the user clicks on the clear history button", () => {
            const component = TestUtils.renderIntoDocument(
                <_Home
                    codes={codes}
                    dropCodesCollection={dropCodesCollection}
                    getCodesCollection={getCodesCollection}
                    shortenUrl={shortenUrl}
                />
            );
            const buttonNodes = TestUtils.scryRenderedDOMComponentsWithTag(component, "button");
            const clearHistoryNode = buttonNodes.find(node => (
                node.firstChild.textContent === "Clear history"
            ));
            TestUtils.Simulate.click(clearHistoryNode);
            expect(dropCodesCollection).to.have.callCount(1);
        });

        it("calls shortenUrl on UrlForm submit", () => {
            const component = TestUtils.renderIntoDocument(
                <_Home
                    codes={codes}
                    dropCodesCollection={dropCodesCollection}
                    getCodesCollection={getCodesCollection}
                    shortenUrl={shortenUrl}
                />
            );
            const urlFormNode = TestUtils.findRenderedComponentWithType(component, UrlForm);
            urlFormNode.props.onSubmit("http://shooooort.com");
            expect(shortenUrl).to.have.callCount(1);
            expect(shortenUrl).to.have.been.calledWith("http://shooooort.com");
        });

        it("calls getCodesCollection on (before) mount", () => {
            TestUtils.renderIntoDocument(
                <_Home
                    codes={codes}
                    dropCodesCollection={dropCodesCollection}
                    getCodesCollection={getCodesCollection}
                    shortenUrl={shortenUrl}
                />
            );
            expect(getCodesCollection).to.have.callCount(1);
        });

    });

});
