import {BeatLoader} from "halogen";
import React from "react";
import {propTypes, t} from "tcomb-react";

import Icon from "components/icon";
import * as colors from "lib/colors";

const AsyncResultWrapper = React.createClass({

    propTypes: propTypes({
        children: t.maybe(t.ReactChildren),
        loading: t.maybe(t.Boolean),
        error: t.maybe(t.Boolean)
    }),

    render () {
        const {children, error, loading} = this.props;
        if (loading) {
            return (
                <BeatLoader color={colors.accent} size="10px" />
            );
        }
        if (error) {
            return (
                <Icon color={colors.accent} icon="exclamation-circle" />
            );
        }
        return React.Children.only(children);
    }

});

export default AsyncResultWrapper;
