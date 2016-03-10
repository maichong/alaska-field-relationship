/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

export default class RelationshipFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    details: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      data: [{ text: 'hehe', id: 1 }]
    };

    let me = this;

    let prefix = context.settings.services['alaska-admin'].prefix;

    this.state.options = {
      ajax: {
        url: prefix + '/select2',
        cache: true,
        data: function (params) {
          let field = me.props.field;
          return {
            service: field.service,
            model: field.model,
            search: params.term,
            page: params.page
          };
        }
      }
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    this.setState(newState);
  }

  _handleChange(event) {
    if (this.refs.select) {
      let value = this.refs.select.el.val();
      if (!value && this.props.field.many) {
        value = [];
      }
      this.props.onChange && this.props.onChange(value);
    }
  }

  render() {
    let { field, value, model } = this.props;
    let { muiTheme, options } = this.state;
    let noteElement = field.note ?
      <div style={field.fullWidth?muiTheme.fieldNote:muiTheme.fieldNoteInline}>{field.note}</div> : null;
    let styles = {
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
    let data = [];
    let key = model.key;
    let details = this.context.details;
    let titleField = model.title || 'title';
    if (details[key]) {
      for (let id in details[key]) {
        data.push({
          id,
          text: details[key][titleField] || id
        });
      }
    }
    return (
      <div style={styles.root}>
        <div style={styles.label}>{field.label}</div>
        <Select2
          ref="select"
          multiple={field.many}
          value={value}
          data={data}
          style={styles.select}
          options={options}
          onChange={this._handleChange}
        />{noteElement}</div>
    );
  }
}
