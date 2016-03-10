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

var _reactSelect2Wrapper = require('react-select2-wrapper');

var _reactSelect2Wrapper2 = _interopRequireDefault(_reactSelect2Wrapper);

require('react-select2-wrapper/css/select2.css');

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

    _this._handleChange = _this._handleChange.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      data: [{ text: 'hehe', id: 1 }]
    };

    var me = _this;

    var prefix = context.settings.services['alaska-admin'].prefix;

    _this.state.options = {
      ajax: {
        url: prefix + '/select2',
        cache: true,
        data: function data(params) {
          var field = me.props.field;
          return {
            service: field.service,
            model: field.model,
            search: params.term,
            page: params.page
          };
        }
      }
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
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      this.setState(newState);
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(event) {
      if (this.refs.select) {
        var value = this.refs.select.el.val();
        if (!value && this.props.field.many) {
          value = [];
        }
        this.props.onChange && this.props.onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var value = _props.value;
      var model = _props.model;
      var _state = this.state;
      var muiTheme = _state.muiTheme;
      var options = _state.options;

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
      var data = [];
      var key = model.key;
      var details = this.context.details;
      var titleField = model.title || 'title';
      if (details[key]) {
        for (var id in details[key]) {
          data.push({
            id: id,
            text: details[key][titleField] || id
          });
        }
      }
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          'div',
          { style: styles.label },
          field.label
        ),
        _react2.default.createElement(_reactSelect2Wrapper2.default, {
          ref: 'select',
          multiple: field.many,
          value: value,
          data: data,
          style: styles.select,
          options: options,
          onChange: this._handleChange
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
  settings: _react2.default.PropTypes.object,
  details: _react2.default.PropTypes.object
};
RelationshipFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
RelationshipFieldView.mixins = [_contextPure2.default];
exports.default = RelationshipFieldView;