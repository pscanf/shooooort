webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(1);
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(347);
	
	var _reactRedux = __webpack_require__(348);
	
	var _reactRouter = __webpack_require__(365);
	
	var _routes = __webpack_require__(422);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _store = __webpack_require__(688);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = _react2.default.createElement(
	    _reactRedux.Provider,
	    { store: _store2.default },
	    _react2.default.createElement(
	        _reactRouter.Router,
	        { history: _reactRouter.browserHistory },
	        _routes2.default
	    )
	);
	
	(0, _reactDom.render)(App, document.getElementById("root"));

/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(365);
	
	var _root = __webpack_require__(423);
	
	var _root2 = _interopRequireDefault(_root);
	
	var _home = __webpack_require__(476);
	
	var _home2 = _interopRequireDefault(_home);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createElement(
	    _reactRouter.Route,
	    { component: _root2.default, path: "/" },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default })
	);

/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tcombReact = __webpack_require__(424);
	
	var _header = __webpack_require__(475);
	
	var _header2 = _interopRequireDefault(_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Root = _react2.default.createClass({
	    displayName: "Root",
	
	    propTypes: (0, _tcombReact.propTypes)({
	        children: _tcombReact.t.ReactNode
	    }, { strict: false }),
	
	    render: function render() {
	        return _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement(_header2.default, null),
	            this.props.children
	        );
	    }
	});
	
	exports.default = Root;

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Header = _react2.default.createClass({
	    displayName: "Header",
	    render: function render() {
	        return _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement(
	                "span",
	                null,
	                "Shooooort"
	            ),
	            _react2.default.createElement(
	                "span",
	                null,
	                "The url shortener with a long name"
	            )
	        );
	    }
	});
	
	exports.default = Header;

/***/ },

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ramda = __webpack_require__(477);
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(348);
	
	var _tcombReact = __webpack_require__(424);
	
	var _dropCodesCollection = __webpack_require__(478);
	
	var _dropCodesCollection2 = _interopRequireDefault(_dropCodesCollection);
	
	var _getCodesCollection = __webpack_require__(480);
	
	var _getCodesCollection2 = _interopRequireDefault(_getCodesCollection);
	
	var _shortenUrl = __webpack_require__(503);
	
	var _shortenUrl2 = _interopRequireDefault(_shortenUrl);
	
	var _codesList = __webpack_require__(504);
	
	var _codesList2 = _interopRequireDefault(_codesList);
	
	var _urlForm = __webpack_require__(683);
	
	var _urlForm2 = _interopRequireDefault(_urlForm);
	
	var _appTcombTypes = __webpack_require__(581);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Home = _react2.default.createClass({
	    displayName: "Home",
	
	    propTypes: (0, _tcombReact.propTypes)({
	        codes: _appTcombTypes.CodesCollection,
	        dropCodesCollection: _tcombReact.t.Function,
	        getCodesCollection: _tcombReact.t.Function,
	        shortenUrl: _tcombReact.t.Function
	    }, { strict: false }),
	
	    componentWillMount: function componentWillMount() {
	        this.props.getCodesCollection();
	    },
	    render: function render() {
	        var _props = this.props;
	        var codes = _props.codes;
	        var dropCodesCollection = _props.dropCodesCollection;
	        var shortenUrl = _props.shortenUrl;
	
	        return _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement(_urlForm2.default, { onSubmit: shortenUrl }),
	            _react2.default.createElement(
	                "h3",
	                null,
	                "Previously shortened by you"
	            ),
	            _react2.default.createElement(
	                "button",
	                { onClick: dropCodesCollection },
	                "Clear history"
	            ),
	            _react2.default.createElement(_codesList2.default, { codes: codes })
	        );
	    }
	});
	
	function mapStateToProps(state) {
	    return {
	        codes: state.codes
	    };
	}
	function mapDispatchToProps(dispatch) {
	    return {
	        dropCodesCollection: (0, _ramda.pipe)(_dropCodesCollection2.default, dispatch),
	        getCodesCollection: (0, _ramda.pipe)(_getCodesCollection2.default, dispatch),
	        shortenUrl: (0, _ramda.pipe)(_shortenUrl2.default, dispatch)
	    };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DROP_CODES_COLLECTION_SUCCESS = undefined;
	exports.default = dropCodesCollection;
	
	var _codesCollection = __webpack_require__(479);
	
	var DROP_CODES_COLLECTION_SUCCESS = exports.DROP_CODES_COLLECTION_SUCCESS = "DROP_CODES_COLLECTION_SUCCESS";
	
	function dropCodesCollection() {
	    (0, _codesCollection.drop)();
	    return {
	        type: DROP_CODES_COLLECTION_SUCCESS,
	        payload: (0, _codesCollection.get)()
	    };
	}

/***/ },

/***/ 479:
/***/ function(module, exports) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.get = get;
	exports.insert = insert;
	exports.drop = drop;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var LOCALSTORAGE_KEY = "codes";
	function getCollection() {
	    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "{}");
	}
	function setCollection(db) {
	    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(db));
	}
	
	function get() {
	    return getCollection();
	}
	
	function insert(_ref) {
	    var code = _ref.code;
	    var url = _ref.url;
	
	    setCollection(_extends({}, getCollection(), _defineProperty({}, code, { code: code, url: url })));
	}
	
	function drop() {
	    setCollection({});
	}

/***/ },

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GET_CODES_COLLECTION_SUCCESS = undefined;
	exports.default = getCodesCollection;
	
	var _ramda = __webpack_require__(477);
	
	var _getCodeStats = __webpack_require__(481);
	
	var _getCodeStats2 = _interopRequireDefault(_getCodeStats);
	
	var _codesCollection = __webpack_require__(479);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	var GET_CODES_COLLECTION_SUCCESS = exports.GET_CODES_COLLECTION_SUCCESS = "GET_CODES_COLLECTION_SUCCESS";
	
	function getCodesCollection() {
	    var _this2 = this;
	
	    return function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch) {
	            var codesCollection;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            codesCollection = (0, _codesCollection.get)();
	
	                            dispatch({
	                                type: GET_CODES_COLLECTION_SUCCESS,
	                                payload: codesCollection
	                            });
	                            (0, _ramda.values)(codesCollection).forEach(function (code) {
	                                return dispatch((0, _getCodeStats2.default)(code.code));
	                            });
	
	                        case 3:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, _this2);
	        })),
	            _this = _this2;
	
	        return function (_x) {
	            return ref.apply(_this, arguments);
	        };
	    }();
	}

/***/ },

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GET_CODE_STATS_ERROR = exports.GET_CODE_STATS_SUCCESS = exports.GET_CODE_STATS_START = undefined;
	exports.default = getCodeStats;
	
	var _bluebird = __webpack_require__(482);
	
	var _axios = __webpack_require__(484);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GET_CODE_STATS_START = exports.GET_CODE_STATS_START = "GET_CODE_STATS_START";
	var GET_CODE_STATS_SUCCESS = exports.GET_CODE_STATS_SUCCESS = "GET_CODE_STATS_SUCCESS";
	var GET_CODE_STATS_ERROR = exports.GET_CODE_STATS_ERROR = "GET_CODE_STATS_ERROR";
	
	function getCodeStats(code) {
	    return function (dispatch) {
	        return (0, _bluebird.resolve)().then(function () {
	            dispatch({
	                type: GET_CODE_STATS_START,
	                meta: { code: code }
	            });
	            return _axios2.default.get("/" + code + "/stats");
	        }).then(function (res) {
	            dispatch({
	                type: GET_CODE_STATS_SUCCESS,
	                payload: res.data,
	                meta: { code: code }
	            });
	        }).catch(function (err) {
	            /*
	            *   We want to dispatch a GET_CODE_STATS_ERROR action only when
	            *   `axios.get` fails. If the error occurred while dispatching,
	            *   we only rethrow it to be logged in the final catch.
	            *   Since errors thrown by axios are not Error instances, we can
	            *   use that fact to discriminate between axios errors and
	            *   dispatch errors.
	            */
	            if (err instanceof Error) {
	                throw err;
	            }
	            dispatch({
	                type: GET_CODE_STATS_ERROR,
	                payload: err,
	                error: true,
	                meta: { code: code }
	            });
	        }).catch(function (err) {
	            console.error(err);
	        });
	    };
	}

/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _axios = __webpack_require__(485);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _config = __webpack_require__(502);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _axios2.default.create({
	    baseURL: _config.API_URL,
	    timeout: 5000
	});

/***/ },

/***/ 502:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var API_URL = exports.API_URL = window.APP_CONFIG.API_URL;

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SHORTEN_URL_ERROR = exports.SHORTEN_URL_SUCCESS = exports.SHORTEN_URL_START = undefined;
	exports.default = shortenUrl;
	
	var _bluebird = __webpack_require__(482);
	
	var _axios = __webpack_require__(484);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _codesCollection = __webpack_require__(479);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SHORTEN_URL_START = exports.SHORTEN_URL_START = "SHORTEN_URL_START";
	var SHORTEN_URL_SUCCESS = exports.SHORTEN_URL_SUCCESS = "SHORTEN_URL_SUCCESS";
	var SHORTEN_URL_ERROR = exports.SHORTEN_URL_ERROR = "SHORTEN_URL_ERROR";
	
	function shortenUrl(url) {
	    return function (dispatch) {
	        return (0, _bluebird.resolve)().then(function () {
	            dispatch({ type: SHORTEN_URL_START });
	            return _axios2.default.post("/shorten", { url: url });
	        }).then(function (res) {
	            var code = {
	                code: res.data.shortcode,
	                url: url
	            };
	            (0, _codesCollection.insert)(code);
	            dispatch({ type: SHORTEN_URL_SUCCESS, payload: code });
	        }).catch(function (err) {
	            /*
	            *   We want to dispatch a SHORTEN_URL_ERROR action only when
	            *   `axios.post` fails. If the error occurred while dispatching,
	            *   we only rethrow it to be logged in the final catch.
	            *   Since errors thrown by axios are not Error instances, we can
	            *   use that fact to discriminate between axios errors and
	            *   dispatch errors.
	            */
	            if (err instanceof Error) {
	                throw err;
	            }
	            dispatch({ type: SHORTEN_URL_ERROR, payload: err, error: true });
	        }).catch(function (err) {
	            console.error(err);
	        });
	    };
	}

/***/ },

/***/ 504:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _copyToClipboard = __webpack_require__(505);
	
	var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);
	
	var _radium = __webpack_require__(507);
	
	var _radium2 = _interopRequireDefault(_radium);
	
	var _ramda = __webpack_require__(477);
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tcombReact = __webpack_require__(424);
	
	var _config = __webpack_require__(502);
	
	var _asyncResultWrapper = __webpack_require__(555);
	
	var _asyncResultWrapper2 = _interopRequireDefault(_asyncResultWrapper);
	
	var _appTcombTypes = __webpack_require__(581);
	
	var _utils = __webpack_require__(583);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
	    codeEntry: {
	        ".code-entry .click-to-copy-button": {
	            display: "none"
	        },
	        ".code-entry:hover .click-to-copy-button": {
	            display: "initial"
	        }
	    }
	};
	
	var CodesList = _react2.default.createClass({
	    displayName: "CodesList",
	
	    propTypes: (0, _tcombReact.propTypes)({
	        codes: _appTcombTypes.CodesCollection
	    }),
	
	    handleClick: function handleClick(code) {
	        return function () {
	            (0, _copyToClipboard2.default)(_config.API_URL + "/" + code.code);
	        };
	    },
	    renderCodeEntry: function renderCodeEntry(code) {
	        return _react2.default.createElement(
	            "tr",
	            {
	                className: "code-entry",
	                key: code.code,
	                onClick: this.handleClick(code)
	            },
	            _react2.default.createElement(_radium.Style, { rules: styles.codeEntry }),
	            _react2.default.createElement(
	                "td",
	                null,
	                _react2.default.createElement(
	                    "div",
	                    null,
	                    _react2.default.createElement(
	                        "span",
	                        null,
	                        "shooooort.com/"
	                    ),
	                    _react2.default.createElement(
	                        "span",
	                        null,
	                        code.code
	                    ),
	                    " ",
	                    _react2.default.createElement(
	                        "span",
	                        { className: "click-to-copy-button" },
	                        "Click to copy this link"
	                    )
	                ),
	                code.url
	            ),
	            _react2.default.createElement(
	                "td",
	                null,
	                _react2.default.createElement(
	                    _asyncResultWrapper2.default,
	                    {
	                        error: !!code.errorFetchingStats,
	                        loading: code.fetchingStats
	                    },
	                    _react2.default.createElement(
	                        "span",
	                        null,
	                        code.stats && code.stats.redirectCount || 0
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                "td",
	                null,
	                _react2.default.createElement(
	                    _asyncResultWrapper2.default,
	                    {
	                        error: !!code.errorFetchingStats,
	                        loading: code.fetchingStats
	                    },
	                    _react2.default.createElement(
	                        "span",
	                        null,
	                        (0, _utils.timeago)(code.stats && code.stats.lastSeenDate)
	                    )
	                )
	            )
	        );
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            "table",
	            null,
	            _react2.default.createElement(
	                "thead",
	                null,
	                _react2.default.createElement(
	                    "tr",
	                    null,
	                    _react2.default.createElement(
	                        "th",
	                        null,
	                        "Link"
	                    ),
	                    _react2.default.createElement(
	                        "th",
	                        null,
	                        "Visits"
	                    ),
	                    _react2.default.createElement(
	                        "th",
	                        null,
	                        "Last visited"
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                "tbody",
	                null,
	                (0, _ramda.values)(this.props.codes).map(this.renderCodeEntry)
	            )
	        );
	    }
	});
	
	exports.default = (0, _radium2.default)(CodesList);

/***/ },

/***/ 555:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _halogen = __webpack_require__(556);
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tcombReact = __webpack_require__(424);
	
	var _icon = __webpack_require__(579);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _colors = __webpack_require__(580);
	
	var colors = _interopRequireWildcard(_colors);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AsyncResultWrapper = _react2.default.createClass({
	    displayName: "AsyncResultWrapper",
	
	    propTypes: (0, _tcombReact.propTypes)({
	        children: _tcombReact.t.maybe(_tcombReact.t.ReactChildren),
	        loading: _tcombReact.t.maybe(_tcombReact.t.Boolean),
	        error: _tcombReact.t.maybe(_tcombReact.t.Boolean)
	    }),
	
	    render: function render() {
	        var _props = this.props;
	        var children = _props.children;
	        var error = _props.error;
	        var loading = _props.loading;
	
	        if (loading) {
	            return _react2.default.createElement(_halogen.BeatLoader, { color: colors.accent, size: "10px" });
	        }
	        if (error) {
	            return _react2.default.createElement(_icon2.default, { color: colors.accent, icon: "exclamation-circle" });
	        }
	        return _react2.default.Children.only(children);
	    }
	});
	
	exports.default = AsyncResultWrapper;

/***/ },

/***/ 579:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ramda = __webpack_require__(477);
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tcombReact = __webpack_require__(424);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Icon = _react2.default.createClass({
	    displayName: "Icon",
	
	    propTypes: (0, _tcombReact.propTypes)({
	        className: _tcombReact.t.maybe(_tcombReact.t.String),
	        color: _tcombReact.t.maybe(_tcombReact.t.String),
	        icon: _tcombReact.t.String,
	        onClick: _tcombReact.t.maybe(_tcombReact.t.Function),
	        size: _tcombReact.t.maybe(_tcombReact.t.String),
	        spin: _tcombReact.t.maybe(_tcombReact.t.Boolean),
	        style: _tcombReact.t.maybe(_tcombReact.t.Object)
	    }),
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            color: undefined,
	            onClick: undefined,
	            size: undefined,
	            spin: false,
	            style: {}
	        };
	    },
	    getClassName: function getClassName() {
	        var _props = this.props;
	        var className = _props.className;
	        var icon = _props.icon;
	        var spin = _props.spin;
	
	        return [
	        // FontAwesome icon class
	        "fa fa-" + icon,
	        // FontAwesome spin class
	        spin ? "fa-spin" : undefined, className].filter(_ramda.identity).join(" ");
	    },
	    getStyle: function getStyle() {
	        var _props2 = this.props;
	        var color = _props2.color;
	        var onClick = _props2.onClick;
	        var size = _props2.size;
	        var style = _props2.style;
	
	        return (0, _ramda.pickBy)(_ramda.identity, _extends({
	            color: color,
	            cursor: onClick ? "pointer" : undefined,
	            fontSize: size
	        }, style));
	    },
	    render: function render() {
	        var onClick = this.props.onClick;
	
	        return _react2.default.createElement("i", {
	            className: this.getClassName(),
	            onClick: onClick,
	            style: this.getStyle()
	        });
	    }
	});
	
	exports.default = Icon;

/***/ },

/***/ 580:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var primaryText = exports.primaryText = "#555555";
	var secondaryText = exports.secondaryText = "#aaaaaa";
	var unimportantText = exports.unimportantText = "#cccccc";
	var disabledButtonText = exports.disabledButtonText = "#bfbfbf";
	var disabledButtonBackground = exports.disabledButtonBackground = "#e0e0e0";
	var lightBackgorund = exports.lightBackgorund = "#eaeaea";
	var accent = exports.accent = "#eb4a42";

/***/ },

/***/ 581:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CodesCollection = exports.Code = exports.URLString = exports.ISO8601String = undefined;
	
	var _tcombReact = __webpack_require__(424);
	
	var _validator = __webpack_require__(582);
	
	var ISO8601String = exports.ISO8601String = _tcombReact.t.refinement(_tcombReact.t.String, _validator.isISO8601);
	var URLString = exports.URLString = _tcombReact.t.refinement(_tcombReact.t.String, _validator.isURL);
	
	var Code = exports.Code = _tcombReact.t.struct({
	    code: _tcombReact.t.String,
	    url: URLString,
	    fetchingStats: _tcombReact.t.Boolean,
	    errorFetchingStats: _tcombReact.t.maybe(_tcombReact.t.Object),
	    stats: _tcombReact.t.maybe(_tcombReact.t.struct({
	        startDate: ISO8601String,
	        lastSeenDate: ISO8601String,
	        redirectCount: _tcombReact.t.Number
	    }))
	}, "Code");
	
	var CodesCollection = exports.CodesCollection = _tcombReact.t.dict(_tcombReact.t.String, Code, "CodesCollection");

/***/ },

/***/ 583:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.timeago = timeago;
	exports.urlIsValid = urlIsValid;
	
	var _moment = __webpack_require__(584);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _validator = __webpack_require__(582);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function timeago(date) {
	    return (0, _moment2.default)(date).fromNow();
	}
	
	function urlIsValid(url) {
	    return (0, _validator.isURL)(url, {
	        protocols: ["http", "https"],
	        require_protocol: true,
	        require_valid_protocol: true
	    });
	}

/***/ },

/***/ 683:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(191);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsLinkedStateMixin = __webpack_require__(684);
	
	var _reactAddonsLinkedStateMixin2 = _interopRequireDefault(_reactAddonsLinkedStateMixin);
	
	var _tcombReact = __webpack_require__(424);
	
	var _utils = __webpack_require__(583);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UrlForm = _react2.default.createClass({
	    displayName: "UrlForm",
	
	    propTypes: (0, _tcombReact.propTypes)({
	        onSubmit: _tcombReact.t.Function
	    }, { strict: false }),
	
	    mixins: [_reactAddonsLinkedStateMixin2.default],
	
	    getInitialState: function getInitialState() {
	        return {};
	    },
	    handleSubmit: function handleSubmit(e) {
	        e.preventDefault();
	        this.props.onSubmit(this.state.url);
	        this.replaceState({});
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            "form",
	            { onSubmit: this.handleSubmit },
	            _react2.default.createElement("input", {
	                placeholder: "Paste the link you want to shorten here",
	                type: "text",
	                valueLink: this.linkState("url")
	            }),
	            _react2.default.createElement(
	                "button",
	                {
	                    disabled: !(0, _utils.urlIsValid)(this.state.url),
	                    type: "submit"
	                },
	                "Shorten this link"
	            )
	        );
	    }
	});
	
	exports.default = UrlForm;

/***/ },

/***/ 688:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _reactRouter = __webpack_require__(365);
	
	var _reactRouterRedux = __webpack_require__(689);
	
	var _redux = __webpack_require__(355);
	
	var _reduxLogger = __webpack_require__(690);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reduxThunk = __webpack_require__(691);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(692);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reduxRouterMiddleware = (0, _reactRouterRedux.syncHistory)(_reactRouter.browserHistory);
	
	var middleware = (0, _redux.applyMiddleware)(reduxRouterMiddleware, _reduxThunk2.default, (0, _reduxLogger2.default)({ collapsed: true }));
	
	exports.default = (0, _redux.compose)(middleware)(_redux.createStore)(_reducers2.default);

/***/ },

/***/ 692:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _redux = __webpack_require__(355);
	
	var _reactRouterRedux = __webpack_require__(689);
	
	var _codes = __webpack_require__(693);
	
	var _codes2 = _interopRequireDefault(_codes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	    codes: _codes2.default,
	    routing: _reactRouterRedux.routeReducer
	});

/***/ },

/***/ 693:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = codes;
	
	var _ramda = __webpack_require__(477);
	
	var _dropCodesCollection = __webpack_require__(478);
	
	var _getCodesCollection = __webpack_require__(480);
	
	var _getCodeStats = __webpack_require__(481);
	
	var _shortenUrl = __webpack_require__(503);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function codes() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _ref = arguments[1];
	    var type = _ref.type;
	    var payload = _ref.payload;
	    var meta = _ref.meta;
	
	    switch (type) {
	        case _dropCodesCollection.DROP_CODES_COLLECTION_SUCCESS:
	            return {};
	        case _getCodesCollection.GET_CODES_COLLECTION_SUCCESS:
	            return (0, _ramda.map)(function (code) {
	                return _extends({}, code, {
	                    fetchingStats: false,
	                    errorFetchingStats: null,
	                    stats: null
	                });
	            }, payload);
	        case _getCodeStats.GET_CODE_STATS_START:
	            return _extends({}, state, _defineProperty({}, meta.code, _extends({}, state[meta.code], {
	                fetchingStats: true,
	                errorFetchingStats: null,
	                stats: null
	            })));
	        case _getCodeStats.GET_CODE_STATS_SUCCESS:
	            return _extends({}, state, _defineProperty({}, meta.code, _extends({}, state[meta.code], {
	                fetchingStats: false,
	                errorFetchingStats: null,
	                stats: payload
	            })));
	        case _getCodeStats.GET_CODE_STATS_ERROR:
	            return _extends({}, state, _defineProperty({}, meta.code, _extends({}, state[meta.code], {
	                fetchingStats: false,
	                errorFetchingStats: payload,
	                stats: null
	            })));
	        case _shortenUrl.SHORTEN_URL_SUCCESS:
	            return _extends({}, state, _defineProperty({}, payload.code, _extends({}, payload, {
	                fetchingStats: false,
	                errorFetchingStats: null,
	                stats: null
	            })));
	        default:
	            return state;
	    }
	}

/***/ }

});
//# sourceMappingURL=app.js.map