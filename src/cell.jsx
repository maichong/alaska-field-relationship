/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'alaska-admin-view';
import { Link } from 'react-router';

import '../relationship.less';

class RelationshipFieldCell extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      display: ''
    };
    this._fetch = {};
  }

  shouldComponentUpdate(props, state) {
    let field = this.props.field;
    let key = field.key;
    let details = this.props.details;
    let value = props.value;
    if (!value) {
      return false;
    }
    if (value !== this.props.value) {
      return true;
    }
    if (!props.details[key] || !details[key]) {
      return true;
    }
    if (typeof value === 'string') {
      if (props.details[key][value] !== details[key][value]) {
        return true;
      }
    } else {
      for (let i in value) {
        let id = value[i];
        if (props.details[key][id] !== details[key][id]) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillUnmount() {
    this._fetch = {};
  }

  getLink(value, index) {
    let field = this.props.field;
    let details = this.props.details;
    let key = field.key;
    let title = value;
    if (value && details && details[key] && details[key][value]) {
      title = details[key][value][field.title] || value;
    } else {
      if (!this._fetch[value]) {
        setTimeout(()=> {
          this.props.actions.detailsIfNeed({
            service: field.service,
            model: field.model,
            key,
            id: value
          });
        }, 1);
        this._fetch[value] = true;
      }
    }
    return <Link key={index} to={'/edit/' + field.service + '/' + field.model + '/' +value}>{title}</Link>;
  }

  render() {
    let value = this.props.value;
    if (!value) {
      return <div></div>;
    }
    let display;
    if (Array.isArray(value)) {
      display = value.map((v, i)=>this.getLink(v, i));
    } else {
      display = this.getLink(value);
    }
    return (
      <div className="relationship-field-cell">{display}</div>
    );
  }
}

export default connect(({details}) => ({ details }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(RelationshipFieldCell);
