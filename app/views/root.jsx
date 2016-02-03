import Radium, {Style} from "radium";
import React from "react";
import {propTypes, t} from "tcomb-react";

import Header from "components/header";
import Spacer from "components/spacer";
import colors from "lib/colors";

const styleRules = {
    root: {
        body: {
            margin: "0px",
            fontFamily: "roboto",
            fontWeight: 300,
            fontSize: "16px",
            color: colors.primaryText
        }
    }
};
const styles = {
    root: {
        width: "622px"
    }
};

const Root = React.createClass({

    propTypes: propTypes({
        children: t.ReactNode
    }, {strict: false}),

    render () {
        return (
            <div style={styles.root}>
                <Style rules={styleRules.root} />
                <Header />
                <Spacer direction="v" size={45} />
                {this.props.children}
            </div>
        );
    }

});

export default Radium(Root);
