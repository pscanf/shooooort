import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import UrlForm from "components/url-form";

chai.use(jsxChai);
chai.use(sinonChai);

describe("components/url-form", () => {

    describe("UrlForm", () => {

        it("renders a form, an input element and a submit button", () => {
            const submitHandler = sinon.spy();
            const component = TestUtils.renderIntoDocument(
                <UrlForm onSubmit={submitHandler} />
            );
            TestUtils.findRenderedDOMComponentWithTag(component, "form");
            TestUtils.findRenderedDOMComponentWithTag(component, "input");
            const buttonNode = TestUtils.findRenderedDOMComponentWithTag(component, "button");
            expect(buttonNode.type).to.equal("submit");
        });

        it("updates the input value when the user changes its content", () => {
            const submitHandler = sinon.spy();
            const component = TestUtils.renderIntoDocument(
                <UrlForm onSubmit={submitHandler} />
            );
            const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, "input");
            TestUtils.Simulate.change(inputNode, {target: {value: "value"}});
            expect(inputNode.value).to.equal("value");
        });

        it("renders a disabled button if the input value is not a valid url", () => {
            const submitHandler = sinon.spy();
            const component = TestUtils.renderIntoDocument(
                <UrlForm onSubmit={submitHandler} />
            );
            const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, "input");
            TestUtils.Simulate.change(inputNode, {target: {value: "notAValidUrl"}});
            const buttonNode = TestUtils.findRenderedDOMComponentWithTag(component, "button");
            expect(buttonNode.disabled).to.equal(true);
        });

        it("renders an enabled button if the input value is a valid url", () => {
            const submitHandler = sinon.spy();
            const component = TestUtils.renderIntoDocument(
                <UrlForm onSubmit={submitHandler} />
            );
            const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, "input");
            TestUtils.Simulate.change(inputNode, {target: {value: "http://shooooort.com"}});
            const buttonNode = TestUtils.findRenderedDOMComponentWithTag(component, "button");
            expect(buttonNode.disabled).to.equal(false);
        });

        describe("onSubmit", () => {

            it("prevents the default browser action", () => {
                const submitHandler = sinon.spy();
                const preventDefault = sinon.spy();
                const component = TestUtils.renderIntoDocument(
                    <UrlForm onSubmit={submitHandler} />
                );
                const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, "input");
                TestUtils.Simulate.change(inputNode, {target: {value: "http://shooooort.com"}});
                const formNode = TestUtils.findRenderedDOMComponentWithTag(component, "form");
                TestUtils.Simulate.submit(formNode, {preventDefault});
                expect(preventDefault).to.have.callCount(1);
            });

            it("calls the submit handler with the value of the input", () => {
                const submitHandler = sinon.spy();
                const preventDefault = sinon.spy();
                const component = TestUtils.renderIntoDocument(
                    <UrlForm onSubmit={submitHandler} />
                );
                const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, "input");
                TestUtils.Simulate.change(inputNode, {target: {value: "http://shooooort.com"}});
                const formNode = TestUtils.findRenderedDOMComponentWithTag(component, "form");
                TestUtils.Simulate.submit(formNode, {preventDefault});
                expect(submitHandler).to.have.callCount(1);
                expect(submitHandler).to.have.been.calledWith("http://shooooort.com");
            });

            it("resets the input value", () => {
                const submitHandler = sinon.spy();
                const preventDefault = sinon.spy();
                const component = TestUtils.renderIntoDocument(
                    <UrlForm onSubmit={submitHandler} />
                );
                const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, "input");
                TestUtils.Simulate.change(inputNode, {target: {value: "http://shooooort.com"}});
                const formNode = TestUtils.findRenderedDOMComponentWithTag(component, "form");
                TestUtils.Simulate.submit(formNode, {preventDefault});
                expect(inputNode.value).to.equal("");
            });

        });

    });

});
