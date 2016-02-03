import React from "react";
import {propTypes, t} from "tcomb-react";

const Spacer = React.createClass({

    propTypes: propTypes({
        direction: t.enums.of(["h", "v"]),
        size: t.Number
    }, {strict: false}),

    renderH () {
        return (
            <span
                style={{
                    display: "inline-block",
                    width: `${this.props.size}px`
                }}
            />
        );
    },

    renderV () {
        return (
            <div
                style={{
                    width: "100%",
                    height: `${this.props.size}px`
                }}
            />
        );
    },

    render () {
        return (
            this.props.direction === "h" ?
            this.renderH() :
            this.renderV()
        );
    }

});

export default Spacer;
