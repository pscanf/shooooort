import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import Icon from "components/icon";

chai.use(jsxChai);
chai.use(sinonChai);

describe("components/icon", () => {

    describe("Icon", () => {

        it("using defaults", () => {
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(
                <Icon icon="icon" />
            );
            const result = shallowRenderer.getRenderOutput();
            expect(result).to.deep.equal(
                <i
                    className="fa fa-icon"
                    onClick={undefined}
                    style={{}}
                />
            );
        });

        describe("className", () => {

            it("custom className", () => {
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(
                    <Icon
                        className="my class names"
                        icon="icon"
                    />
                );
                const result = shallowRenderer.getRenderOutput();
                expect(result).to.deep.equal(
                    <i
                        className="fa fa-icon my class names"
                        onClick={undefined}
                        style={{}}
                    />
                );
            });

            it("spin", () => {
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(
                    <Icon
                        className="my class names"
                        icon="icon"
                        spin={true}
                    />
                );
                const result = shallowRenderer.getRenderOutput();
                expect(result).to.deep.equal(
                    <i
                        className="fa fa-icon fa-spin my class names"
                        onClick={undefined}
                        style={{}}
                    />
                );
            });

        });

        describe("style", () => {

            it("custom style", () => {
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(
                    <Icon
                        icon="icon"
                        style={{
                            background: "blue"
                        }}
                    />
                );
                const result = shallowRenderer.getRenderOutput();
                expect(result).to.deep.equal(
                    <i
                        className="fa fa-icon"
                        onClick={undefined}
                        style={{
                            background: "blue"
                        }}
                    />
                );
            });

            it("color and size", () => {
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(
                    <Icon
                        color="blue"
                        icon="icon"
                        size="10px"
                    />
                );
                const result = shallowRenderer.getRenderOutput();
                expect(result).to.deep.equal(
                    <i
                        className="fa fa-icon"
                        onClick={undefined}
                        style={{
                            color: "blue",
                            fontSize: "10px"
                        }}
                    />
                );
            });

            it("onClick", () => {
                const fn = () => null;
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(
                    <Icon
                        icon="icon"
                        onClick={fn}
                    />
                );
                const result = shallowRenderer.getRenderOutput();
                expect(result).to.deep.equal(
                    <i
                        className="fa fa-icon"
                        onClick={fn}
                        style={{
                            cursor: "pointer"
                        }}
                    />
                );
            });

        });

        it("click triggers onClick", () => {
            const clickHandler = sinon.spy();
            const component = TestUtils.renderIntoDocument(
                <Icon
                    icon="icon"
                    onClick={clickHandler}
                />
            );
            const node = TestUtils.findRenderedDOMComponentWithTag(component, "i");
            TestUtils.Simulate.click(node);
            expect(clickHandler).to.have.callCount(1);
        });

    });

});
