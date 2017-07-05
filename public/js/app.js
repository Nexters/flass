webpackJsonp([0],{

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(74);

var _HelloWorld = __webpack_require__(162);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _HelloWorldActions = __webpack_require__(80);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handle state change and map it to local component props.
 *
 * @param {Object} state The new app state.
 */
function mapStateToProps(state) {
  return {
    serverTimestamp: state.serverTimestamp
  };
}

/**
 * Map dispatch actions to props.
 *
 * @param {Function} dispatch The dispatch func.
 */
/**
 * @fileOverview The Hello World container.
 */

function mapDispatchToProps(dispatch) {
  return {
    onFetchServerTimestamp: function onFetchServerTimestamp() {
      dispatch((0, _HelloWorldActions.fetchServerTimestamp)());
    }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_HelloWorld2.default);

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(45);

var _HelloWorldReducer = __webpack_require__(163);

var _HelloWorldReducer2 = _interopRequireDefault(_HelloWorldReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview The root reducer, combines all reducers.
 */

exports.default = (0, _redux.combineReducers)({
  serverTimestamp: _HelloWorldReducer2.default
});

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(166);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(342)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./App.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./App.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(142);

var _react = __webpack_require__(37);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(140);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(74);

var _redux = __webpack_require__(45);

var _reduxThunk = __webpack_require__(141);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(139);

var _reducers2 = _interopRequireDefault(_reducers);

var _HelloWorldWrapper = __webpack_require__(138);

var _HelloWorldWrapper2 = _interopRequireDefault(_HelloWorldWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview The app main entry point.
 */

var appBoot = module.exports = {};

appBoot.init = function () {
  console.log('init() :: App starts booting...');

  // Check for devToolsExtension
  var create = window.devToolsExtension ? window.devToolsExtension()(_redux.createStore) : _redux.createStore;

  // Apply thunk and additional middleware if applicable
  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(create);

  // Init store
  var store = createStoreWithMiddleware(_reducers2.default);

  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_HelloWorldWrapper2.default, null)
  ), document.getElementById('app'));
};

// init app
appBoot.init();

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(37);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(53);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileOverview The Hello World component.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var HelloWorld = function (_React$Component) {
  _inherits(HelloWorld, _React$Component);

  function HelloWorld() {
    _classCallCheck(this, HelloWorld);

    return _possibleConstructorReturn(this, (HelloWorld.__proto__ || Object.getPrototypeOf(HelloWorld)).apply(this, arguments));
  }

  _createClass(HelloWorld, [{
    key: 'render',
    value: function render() {
      var serverTimestamp = this.props.serverTimestamp;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Hello World!'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Timestamp: ',
          serverTimestamp
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onFetchServerTimestamp();
    }
  }]);

  return HelloWorld;
}(_react2.default.Component);

/** @const {Object} propTypes definition */


exports.default = HelloWorld;
HelloWorld.propTypes = {
  serverTimestamp: _propTypes2.default.number,
  onFetchServerTimestamp: _propTypes2.default.func.isRequired
};

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = __webpack_require__(336);

var _HelloWorldActions = __webpack_require__(80);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * @fileOverview The Server Timestamp reducer.
                                                                                                                                                                                                                   */

var initialState = null;

exports.default = (0, _reduxActions.handleActions)(_defineProperty({}, _HelloWorldActions.SERVER_TIMESTAMP_UPDATE, function (state, action) {
  return action.timestamp;
}), initialState);

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(167)(undefined);
// imports


// module
exports.push([module.i, "h1,\nh2,\nh3,\nh4,\nh5,\np {\n  color: #231f20; }\n", ""]);

// exports


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchServerTimestamp = exports.SERVER_TIMESTAMP_UPDATE = undefined;

var _axios = __webpack_require__(143);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVER_TIMESTAMP_UPDATE = exports.SERVER_TIMESTAMP_UPDATE = 'SERVER_TIMESTAMP_UPDATE';

/**
 * Update server timestamp.
 *
 * @return {Function} The action handler.
 */
/**
 * @fileOverview Server Timestamp related actions.
 */

var fetchServerTimestamp = exports.fetchServerTimestamp = function fetchServerTimestamp() {
  return function (dispatch) {
    _axios2.default.get('/home/timestamp').then(function (res) {
      dispatch({
        type: SERVER_TIMESTAMP_UPDATE,
        timestamp: res.data.timestamp
      });
    }).catch(function (err) {
      console.log(err);
    });
  };
};

/***/ })

},[161]);
//# sourceMappingURL=app.js.map