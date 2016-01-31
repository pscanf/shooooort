import copy from "copy-to-clipboard";
import Radium, {Style} from "radium";
import {values} from "ramda";
import React from "react";
import {propTypes} from "tcomb-react";

import {API_URL} from "config";
import AsyncResultWrapper from "components/async-result-wrapper";
import {CodesCollection} from "lib/app-tcomb-types";
import {timeago} from "lib/utils";

const styles = {
    codeEntry: {
        ".code-entry .click-to-copy-button": {
            display: "none"
        },
        ".code-entry:hover .click-to-copy-button": {
            display: "initial"
        }
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
        return (
            <tr
                className="code-entry"
                key={code.code}
                onClick={this.handleClick(code)}
            >
                <Style rules={styles.codeEntry} />
                <td>
                    <div>
                        <span>{"shooooort.com/"}</span>
                        <span>{code.code}</span>
                        {" "}
                        <span className="click-to-copy-button">
                            {"Click to copy this link"}
                        </span>
                    </div>
                    {code.url}
                </td>
                <td>
                    <AsyncResultWrapper
                        error={!!code.errorFetchingStats}
                        loading={code.fetchingStats}
                    >
                        <span>
                            {(code.stats && code.stats.redirectCount) || 0}
                        </span>
                    </AsyncResultWrapper>
                </td>
                <td>
                    <AsyncResultWrapper
                        error={!!code.errorFetchingStats}
                        loading={code.fetchingStats}
                    >
                        <span>
                            {timeago(code.stats && code.stats.lastSeenDate)}
                        </span>
                    </AsyncResultWrapper>
                </td>
            </tr>
        );
    },

    render () {
        return (
            <table>
                <thead>
                    <tr>
                        <th>{"Link"}</th>
                        <th>{"Visits"}</th>
                        <th>{"Last visited"}</th>
                    </tr>
                </thead>
                <tbody>
                    {values(this.props.codes).map(this.renderCodeEntry)}
                </tbody>
            </table>
        );
    }

});

export default Radium(CodesList);
