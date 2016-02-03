import copy from "copy-to-clipboard";
import Radium, {Style} from "radium";
import {values} from "ramda";
import React from "react";
import {propTypes} from "tcomb-react";

import {API_URL} from "config";
import AsyncResultWrapper from "components/async-result-wrapper";
import Spacer from "components/spacer";
import {CodesCollection} from "lib/app-tcomb-types";
import colors from "lib/colors";
import {timeago} from "lib/utils";

const styleRules = {
    codeEntry: {
        ".code-entry .click-to-copy-button": {
            display: "none"
        },
        ".code-entry:hover .click-to-copy-button": {
            display: "initial"
        }
    }
};
const styles = {
    listContainer: {
        tableLayout: "fixed",
        width: "100%",
        cursor: "pointer"
    },
    baseHeadColumn: {
        color: colors.unimportantText,
        fontSize: "14px",
        textTransform: "uppercase"
    },
    linkColumnHeader: {
        textAlign: "left"
    },
    visitsHeadColumn: {
        textAlign: "center",
        width: "80px"
    },
    lastVisitedHeadColumn: {
        textAlign: "center",
        width: "120px"
    },
    codeEntryContainer: {
        height: "80px"
    },
    newlyCreatedHighlightContainer: {
        position: "relative"
    },
    newlyCreatedHighlightBar: {
        height: "80px",
        width: "4px",
        backgroundColor: colors.accent,
        opacity: 0,
        transition: "opacity 0.5s",
        position: "absolute",
        left: "-20px",
        top: "-20px"
    },
    showHiglight: {
        opacity: 1
    },
    shortUrlPrefix: {
        fontWeight: 400
    },
    shortUrlCode: {
        fontWeight: 400,
        color: colors.accent
    },
    clickToCopyButton: {
        float: "right",
        color: colors.accent,
        paddingRight: "30px"
    },
    fullUrl: {
        color: colors.unimportantText,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingRight: "30px"
    },
    visitsBodyColumn: {
        textAlign: "center"
    },
    lastVisitedBodyColumn: {
        textAlign: "center"
    }
};

const CodesList = React.createClass({

    propTypes: propTypes({
        codes: CodesCollection
    }),

    handleClick (code) {
        return () => {
            copy(`${API_URL}/${code.code}`);
        };
    },

    renderCodeEntry (code) {
        const redirectCount = (code.stats && code.stats.redirectCount) || 0;
        const lastVisit = (
            redirectCount === 0 ?
            "Never" :
            timeago(code.stats && code.stats.lastSeenDate)
        );
        return (
            <tr
                className="code-entry"
                key={code.code}
                onClick={this.handleClick(code)}
                style={styles.codeEntryContainer}
            >
                <td>
                    <div style={styles.newlyCreatedHighlightContainer}>
                        <div
                            style={[
                                styles.newlyCreatedHighlightBar,
                                code.newlyCreated ? styles.showHiglight : null
                            ]}
                        />
                    </div>
                    <div>
                        <span style={styles.shortUrlPrefix}>
                            {"shooooort.com/"}
                        </span>
                        <span style={styles.shortUrlCode}>
                            {code.code}
                        </span>
                        <span
                            className="click-to-copy-button"
                            style={styles.clickToCopyButton}
                        >
                            {"Click to copy this link"}
                        </span>
                    </div>
                    <Spacer direction="v" size={2} />
                    <div style={styles.fullUrl}>
                        {code.url}
                    </div>
                </td>
                <td style={styles.visitsBodyColumn}>
                    <AsyncResultWrapper
                        error={!!code.errorFetchingStats}
                        loading={code.fetchingStats}
                    >
                        <span>{redirectCount}</span>
                    </AsyncResultWrapper>
                </td>
                <td style={styles.lastVisitedBodyColumn}>
                    <AsyncResultWrapper
                        error={!!code.errorFetchingStats}
                        loading={code.fetchingStats}
                    >
                        <span>{lastVisit}</span>
                    </AsyncResultWrapper>
                </td>
            </tr>
        );
    },

    render () {
        return (
            <table style={styles.listContainer}>
                <thead>
                    <tr>
                        <th style={[styles.baseHeadColumn, styles.linkColumnHeader]}>
                            {"link"}
                        </th>
                        <th style={[styles.baseHeadColumn, styles.visitsHeadColumn]}>
                            {"visits"}
                        </th>
                        <th style={[styles.baseHeadColumn, styles.lastVisitedHeadColumn]}>
                            {"last visited"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Style rules={styleRules.codeEntry} />
                    {values(this.props.codes).map(this.renderCodeEntry)}
                </tbody>
            </table>
        );
    }

});

export default Radium(CodesList);
