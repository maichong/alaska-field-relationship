'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require('react-select/dist/react-select.min.css');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _alaskaAdminView = require('alaska-admin-view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RelationshipFieldView = function (_React$Component) {
  _inherits(RelationshipFieldView, _React$Component);

  function RelationshipFieldView(props, context) {
    _classCallCheck(this, RelationshipFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RelationshipFieldView).call(this, props));

    _this._searchCallback = null;
    _this._searchKeyword = '';

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views
    };
    return _this;
  }

  _createClass(RelationshipFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this2 = this;

      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      this.setState(newState, function () {
        if (_this2._searchCallback && _this2.props.search) {
          var search = _this2.props.search;
          var field = _this2.props.field;
          var key = field.service + '-' + field.model;
          if (search[key] && search[key][_this2._searchKeyword]) {
            _this2._searchCallback(null, { options: search[key][_this2._searchKeyword] });
            _this2._searchCallback = null;
          }
        }
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'search');
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      var _this3 = this;

      if (this.props.onChange) {
        (function () {
          var val = '';
          if (_this3.props.field.multi) {
            val = [];
            value && value.forEach(function (o) {
              val.push(o._id);
            });
          } else if (value) {
            val = value._id;
          }
          _this3.props.onChange(val);
        })();
      }
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(keyword, callback) {
      var _props = this.props;
      var search = _props.search;
      var actions = _props.actions;
      var field = _props.field;

      var key = field.service + '-' + field.model;
      if (search[key] && search[key][keyword]) {
        callback(null, { options: search[key][keyword] });
        return;
      }
      actions.search({
        service: field.service,
        model: field.model,
        keyword: keyword
      });
      this._searchCallback = callback;
      this._searchKeyword = keyword;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var field = _props2.field;
      var value = _props2.value;
      var model = _props2.model;
      var disabled = _props2.disabled;
      var muiTheme = this.state.muiTheme;

      var noteElement = field.note ? _react2.default.createElement(
        'div',
        { style: field.fullWidth ? muiTheme.fieldNote : muiTheme.fieldNoteInline },
        field.note
      ) : null;
      var styles = {
        root: {
          padding: '10px 0'
        },
        label: {
          fontSize: '12px',
          color: '#999',
          paddingBottom: 8
        },
        select: {
          width: '100%',
          marginBottom: 5
        }
      };
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          'div',
          { style: styles.label },
          field.label
        ),
        _react2.default.createElement(_reactSelect2.default.Async, {
          multi: field.multi,
          value: value,
          style: styles.select,
          disabled: disabled,
          valueKey: '_id',
          labelKey: 'title',
          onChange: this.handleChange,
          loadOptions: this.handleSearch
        }),
        noteElement
      );
    }
  }]);

  return RelationshipFieldView;
}(_react2.default.Component);

RelationshipFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
RelationshipFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
RelationshipFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
RelationshipFieldView.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var search = _ref.search;
  return { search: search };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_alaskaAdminView.actions, dispatch)
  };
})(RelationshipFieldView);