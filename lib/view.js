'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('alaska-field-select/lib/Select');

var _Select2 = _interopRequireDefault(_Select);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

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

  function RelationshipFieldView() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RelationshipFieldView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RelationshipFieldView)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (value) {
      if (_this.props.onChange) {
        (function () {
          var val = '';
          if (_this.props.field.multi) {
            val = [];
            value && value.forEach(function (o) {
              val.push(o.value);
            });
          } else if (value) {
            val = value.value;
          }
          _this.setState({ value: value });
          _this.props.onChange(val);
        })();
      }
    }, _this.handleSearch = function (keyword, callback) {
      var field = _this.props.field;
      var query = _qs2.default.stringify({
        service: field.service,
        model: field.model,
        search: keyword,
        filters: field.filters
      });
      _alaskaAdminView.api.post(_alaskaAdminView.PREFIX + '/api/relation?' + query).then(function (res) {
        callback(null, { options: res.results });
      }, callback);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RelationshipFieldView, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'search');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var value = _props.value;
      var disabled = _props.disabled;
      var errorText = _props.errorText;

      var help = field.help;
      var className = 'form-group';
      if (errorText) {
        className += ' has-error';
        help = errorText;
      }
      var helpElement = help ? _react2.default.createElement(
        'p',
        { className: 'help-block' },
        help
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { className: 'control-label col-xs-2' },
          field.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-10' },
          _react2.default.createElement(_Select2.default, {
            multi: field.multi,
            value: value,
            disabled: disabled,
            onChange: this.handleChange,
            loadOptions: this.handleSearch
          }),
          helpElement
        )
      );
    }
  }]);

  return RelationshipFieldView;
}(_react2.default.Component);

RelationshipFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = RelationshipFieldView;