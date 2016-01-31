import chai, {expect} from "chai";
import {BeatLoader} from "halogen";
import jsxChai from "jsx-chai";
import React from "react";
import {createRenderer} from "react-addons-test-utils";

import AsyncResultWrapper from "components/async-result-wrapper";
import Icon from "components/icon";

chai.use(jsxChai);

describe("components/async-result-wrapper", () => {

    describe("AsyncResultWrapper", () => {

        it("displays a loader when prop loading is true", () => {
            const shallowRenderer = createRenderer();
            shallowRenderer.render(
                <AsyncResultWrapper loading={true}>
                    <div id="test" />
                </AsyncResultWrapper>
            );
            const result = shallowRenderer.getRenderOutput();
            expect(result).to.deep.equal(
                <BeatLoader color="#eb4a42" size="10px" />
            );
        });

        it("displays an error when prop loading is false and prop error is true", () => {
            const shallowRenderer = createRenderer();
            shallowRenderer.render(
                <AsyncResultWrapper error={true}>
                    <div id="test" />
                </AsyncResultWrapper>
            );
            const result = shallowRenderer.getRenderOutput();
            expect(result).to.deep.equal(
                <Icon color="#eb4a42" icon="exclamation-circle" />
            );
        });

        it("displays children when neither loading nor error props are true", () => {
            const shallowRenderer = createRenderer();
            shallowRenderer.render(
                <AsyncResultWrapper>
                    <div id="test" />
                </AsyncResultWrapper>
            );
            const result = shallowRenderer.getRenderOutput();
            expect(result).to.deep.equal(
                <div id="test" />
            );
        });

    });

});
