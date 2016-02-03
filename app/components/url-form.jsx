import Radium from "radium";
import React from "react";
import LinkedStateMixin from "react-addons-linked-state-mixin";
import {propTypes, t} from "tcomb-react";

import Spacer from "components/spacer";
import colors from "lib/colors";
import measures from "lib/measures";
import {urlIsValid} from "lib/utils";

const styles = {
    container: {
        display: "flex"
    },
    input: {
        flexGrow: 1,
        border: "0px",
        borderRadius: measures.borderRadiusPx,
        backgroundColor: colors.lightBackgorund,
        fontSize: "16px",
        paddingLeft: "20px",
        paddingRight: "20px",
        outline: "none"
    },
    submitButtonBase: {
        width: "150px",
        height: "38px",
        fontSize: "16px",
        border: "0px",
        borderRadius: measures.borderRadiusPx
    },
    submitButtonDisabled: {
        backgroundColor: colors.disabledButtonBackground,
        color: colors.disabledButtonText,
        cursor: "not-allowed"
    },
    submitButtonEnabled: {
        backgroundColor: colors.accent,
        color: colors.white,
        cursor: "pointer"
    }
};

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
        const urlValid = urlIsValid(this.state.url);
        return (
            <form onSubmit={this.handleSubmit} style={styles.container}>
                <input
                    placeholder="Paste the link you want to shorten here"
                    style={styles.input}
                    type="text"
                    valueLink={this.linkState("url")}
                />
                <Spacer direction="h" size={15} />
                <button
                    disabled={!urlValid}
                    style={[
                        styles.submitButtonBase,
                        urlValid ? styles.submitButtonEnabled : styles.submitButtonDisabled
                    ]}
                    type="submit"
                >
                    {"Shorten this link"}
                </button>
            </form>
        );
    }

});

export default Radium(UrlForm);
