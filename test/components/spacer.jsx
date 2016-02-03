import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";

import Spacer from "components/spacer";

chai.use(jsxChai);

describe("components/spacer", () => {

    describe("Spacer", () => {

        it("horizontal spacer", () => {
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(
                <Spacer direction="h" size={10} />
            );
            const result = shallowRenderer.getRenderOutput();
            expect(result).to.deep.equal(
                <span
                    style={{
                        display: "inline-block",
                        width: "10px"
                    }}
                />
            );
        });

        it("vertical spacer", () => {
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(
                <Spacer direction="v" size={10} />
            );
            const result = shallowRenderer.getRenderOutput();
            expect(result).to.deep.equal(
                <div
                    style={{
                        width: "100%",
                        height: "10px"
                    }}
                />
            );
        });

    });

});
