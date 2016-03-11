/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'alaska-admin-view';

class RelationshipFieldView extends React.Component {

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      data: [{ text: 'hehe', id: 1 }]
    };
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
    this.setState(newState, () => {
      if (this._searchCallback && this.props.search) {
        let search = this.props.search;
        let field = this.props.field;
        let key = field.service + '-' + field.model;
        if (search[key] && search[key][this._searchKeyword]) {
          this._searchCallback(null, { options: search[key][this._searchKeyword] });
          this._searchCallback = null;
        }
      }
    });
  }

  handleChange(value) {
    if (this.props.onChange) {
      let val = '';
      if (this.props.field.multi) {
        val = [];
        value && value.forEach(o => {
          val.push(o._id)
        });
      } else if (value) {
        val = value._id;
      }
      this.props.onChange(val);
    }
  }

  _searchCallback = null;
  _searchKeyword = '';

  handleSearch(keyword, callback) {
    let { search, actions, field } = this.props;
    let key = field.service + '-' + field.model;
    if (search[key] && search[key][keyword]) {
      callback(null, { options: search[key][keyword] });
      return;
    }
    actions.search({
      service: field.service,
      model: field.model,
      keyword
    });
    this._searchCallback = callback;
    this._searchKeyword = keyword;
  }

  render() {
    let { field, value, model, disabled } = this.props;
    let { muiTheme } = this.state;
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
        <Select.Async
          multi={field.multi}
          value={value}
          style={styles.select}
          disabled={disabled}
          valueKey="_id"
          labelKey="title"
          onChange={this.handleChange}
          loadOptions={this.handleSearch}
        />{noteElement}</div>
    );
  }
}

export default connect(({ search }) => ({ search }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(RelationshipFieldView);
