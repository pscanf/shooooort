import React from "react";
import LinkedStateMixin from "react-addons-linked-state-mixin";
import {propTypes, t} from "tcomb-react";

import {urlIsValid} from "lib/utils";

const UrlForm = React.createClass({

    propTypes: propTypes({
        onSubmit: t.Function
    }, {strict: false}),

    mixins: [LinkedStateMixin],

    getInitialState () {
        return {};
    },

    handleSubmit (e) {
        e.preventDefault();
        this.props.onSubmit(this.state.url);
        this.replaceState({});
    },

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="Paste the link you want to shorten here"
                    type="text"
                    valueLink={this.linkState("url")}
                />
                <button
                    disabled={!urlIsValid(this.state.url)}
                    type="submit"
                >
                    {"Shorten this link"}
                </button>
            </form>
        );
    }

});

export default UrlForm;
