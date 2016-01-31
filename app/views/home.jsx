import {pipe} from "ramda";
import React from "react";
import {connect} from "react-redux";
import {propTypes, t} from "tcomb-react";

import dropCodesCollection from "actions/drop-codes-collection";
import getCodesCollection from "actions/get-codes-collection";
import shortenUrl from "actions/shorten-url";
import CodesList from "components/codes-list";
import UrlForm from "components/url-form";
import {CodesCollection} from "lib/app-tcomb-types";

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
                <h3>{"Previously shortened by you"}</h3>
                <button onClick={dropCodesCollection}>{"Clear history"}</button>
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
