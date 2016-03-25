'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _alaskaAdminView = require('alaska-admin-view');

var _reactRouter = require('react-router');

require('../relationship.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RelationshipFieldCell = function (_React$Component) {
  _inherits(RelationshipFieldCell, _React$Component);

  function RelationshipFieldCell(props, context) {
    _classCallCheck(this, RelationshipFieldCell);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RelationshipFieldCell).call(this, props));

    _this.state = {
      display: ''
    };
    _this._fetch = {};
    return _this;
  }

  _createClass(RelationshipFieldCell, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      var field = this.props.field;
      var key = field.key;
      var details = this.props.details;
      var value = props.value;
      if (!value) {
        return false;
      }
      if (value !== this.props.value) {
        return true;
      }
      if (!props.details[key] || !details[key]) {
        return true;
      }
      if (props.details[key][value] !== details[key][value]) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._fetch = {};
    }
  }, {
    key: 'getLink',
    value: function getLink(value, index) {
      var _this2 = this;

      var field = this.props.field;
      var details = this.props.details;
      var key = field.key;
      var title = value;
      if (value && details && details[key] && details[key][value]) {
        title = details[key][value][field.title] || value;
      } else {
        if (!this._fetch[value]) {
          setTimeout(function () {
            _this2.props.actions.details({
              service: field.service,
              model: field.model,
              key: key,
              id: value
            });
          }, 1);
          this._fetch[value] = true;
        }
      }
      return _react2.default.createElement(
        _reactRouter.Link,
        { key: index, to: '/edit/' + field.service + '/' + field.model + '/' + value },
        title
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var value = this.props.value;
      if (!value) {
        return _react2.default.createElement('div', null);
      }
      var display = void 0;
      if (Array.isArray(value)) {
        display = value.map(function (v, i) {
          return _this3.getLink(v, i);
        });
      } else {
        display = this.getLink(value);
      }
      return _react2.default.createElement(
        'div',
        { className: 'relationship-field-cell' },
        display
      );
    }
  }]);

  return RelationshipFieldCell;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (_ref) {
  var details = _ref.details;
  return { details: details };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_alaskaAdminView.actions, dispatch)
  };
})(RelationshipFieldCell);