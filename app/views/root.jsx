import React from "react";
import {propTypes, t} from "tcomb-react";

import Header from "components/header";

const Root = React.createClass({

    propTypes: propTypes({
        children: t.ReactNode
    }, {strict: false}),

    render () {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }

});

export default Root;
