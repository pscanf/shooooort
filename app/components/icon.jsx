import {identity, pickBy} from "ramda";
import React from "react";
import {propTypes, t} from "tcomb-react";

const Icon = React.createClass({

    propTypes: propTypes({
        className: t.maybe(t.String),
        color: t.maybe(t.String),
        icon: t.String,
        onClick: t.maybe(t.Function),
        size: t.maybe(t.String),
        spin: t.maybe(t.Boolean),
        style: t.maybe(t.Object)
    }),

    getDefaultProps () {
        return {
            color: undefined,
            onClick: undefined,
            size: undefined,
            spin: false,
            style: {}
        };
    },

    getClassName () {
        const {className, icon, spin} = this.props;
        return [
            // FontAwesome icon class
            ("fa fa-" + icon),
            // FontAwesome spin class
            (spin ? "fa-spin" : undefined),
            className
        ].filter(identity).join(" ");
    },

    getStyle () {
        const {color, onClick, size, style} = this.props;
        return pickBy(identity, {
            color: color,
            cursor: (onClick ? "pointer" : undefined),
            fontSize: size,
            ...style
        });
    },

    render () {
        const {onClick} = this.props;
        return (
            <i
                className={this.getClassName()}
                onClick={onClick}
                style={this.getStyle()}
            />
        );
    }

});

export default Icon;
