import React from "react";

import colors from "lib/colors";

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    logo: {
        fontFamily: "Montserrat",
        fontSize: "47px",
        textDecoration: "underline",
        color: colors.accent
    },
    motto: {
        fontSize: "16.5px",
        color: colors.secondaryText,
        paddingBottom: "10px"
    }
};

const Header = React.createClass({

    render () {
        return (
            <div style={styles.container}>
                <div style={styles.logo}>
                    {"Shooooort"}
                </div>
                <div style={styles.motto}>
                    {"The url shortener with a long name"}
                </div>
            </div>
        );
    }

});

export default Header;
