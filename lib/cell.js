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
      settings: context.settings
    };
    return _this;
  }

  _createClass(RelationshipFieldCell, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this2 = this;

      var newState = {};
      if (nextContext.settings) {
        newState.settings = nextContext.settings;
      }
      this.setState(newState, function () {
        _this2.init();
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var display = [];
      if (Array.isArray(this.props.value)) {
        for (var i = 0; i < this.props.value.length; i++) {
          var el = this.getLink(this.props.value[i]);
          if (el) {
            display.push(el);
          }
        }
      } else {
        var _el = this.getLink(this.props.value);
        if (_el) {
          display.push(_el);
        }
      }
      this.setState({ display: display });
    }
  }, {
    key: 'getLink',
    value: function getLink(value) {
      var field = this.props.field;
      var details = this.props.details;
      if (value && details && details[field.key] && details[field.key][value]) {
        var el = _react2.default.createElement(
          _reactRouter.Link,
          { to: '/edit/' + field.service + '/' + field.model + '/' + details[field.key][value]._id },
          '[',
          details[field.key][value][field.title],
          ']'
        );
        return el;
      } else {
        this.actionDetails(value);
        return false;
      }
    }
  }, {
    key: 'actionDetails',
    value: function actionDetails(id) {
      this.props.actions.details({
        service: this.props.field.service,
        model: this.props.field.model,
        id: id
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return props.value != this.props.value || props.details != this.props.details || state != this.state;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var styles = {
        root: {}
      };
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        state.display
      );
    }
  }]);

  return RelationshipFieldCell;
}(_react2.default.Component);

RelationshipFieldCell.contextTypes = {
  settings: _react2.default.PropTypes.object
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var details = _ref.details;
  return { details: details };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_alaskaAdminView.actions, dispatch)
  };
})(RelationshipFieldCell);