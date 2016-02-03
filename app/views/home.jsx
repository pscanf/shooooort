import {pipe} from "ramda";
import React from "react";
import {connect} from "react-redux";
import {propTypes, t} from "tcomb-react";

import dropCodesCollection from "actions/drop-codes-collection";
import getCodesCollection from "actions/get-codes-collection";
import shortenUrl from "actions/shorten-url";
import CodesList from "components/codes-list";
import Spacer from "components/spacer";
import UrlForm from "components/url-form";
import {CodesCollection} from "lib/app-tcomb-types";
import colors from "lib/colors";

const styles = {
    listHeadingContainer: {
        display: "flex",
        alignItems: "flex-end"
    },
    listHeading: {
        fontSize: "22px"
    },
    clearHistoryButton: {
        border: "0px",
        backgroundColor: colors.white,
        color: colors.accent,
        fontSize: "16px",
        cursor: "pointer",
        paddingBottom: "2px"
    }
};

const Home = React.createClass({

    propTypes: propTypes({
        codes: CodesCollection,
        dropCodesCollection: t.Function,
        getCodesCollection: t.Function,
        shortenUrl: t.Function
    }, {strict: false}),

    componentWillMount () {
        this.props.getCodesCollection();
    },

    render () {
        const {codes, dropCodesCollection, shortenUrl} = this.props;
        return (
            <div>
                <UrlForm onSubmit={shortenUrl} />
                <Spacer direction="v" size={75} />
                <div style={styles.listHeadingContainer}>
                    <div style={styles.listHeading}>
                        {"Previously shortened by you"}
                    </div>
                    <Spacer direction="h" size={10} />
                    <button
                        onClick={dropCodesCollection}
                        style={styles.clearHistoryButton}
                    >
                        {"Clear history"}
                    </button>
                </div>
                <Spacer direction="v" size={50} />
                <CodesList codes={codes} />
            </div>
        );
    }

});

function mapStateToProps (state) {
    return {
        codes: state.codes
    };
}
function mapDispatchToProps (dispatch) {
    return {
        dropCodesCollection: pipe(dropCodesCollection, dispatch),
        getCodesCollection: pipe(getCodesCollection, dispatch),
        shortenUrl: pipe(shortenUrl, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
