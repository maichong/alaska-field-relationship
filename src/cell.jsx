/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from 'alaska-admin-view';
import {Link} from 'react-router';
class RelationshipFieldCell extends React.Component {

  static contextTypes = {
    settings: React.PropTypes.object
  };

  constructor(props, context) {
    super(props);
    this.state = {
      settings: context.settings
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.settings) {
      newState.settings = nextContext.settings;
    }
    this.setState(newState, ()=> {
      this.init();
    });
  }

  init() {
    let display = [];
    if (Array.isArray(this.props.value)) {
      for (let i = 0; i < this.props.value.length; i++) {
        let el = this.getLink(this.props.value[i]);
        if (el) {
          display.push(el);
        }
      }
    } else {
      let el = this.getLink(this.props.value);
      if (el) {
        display.push(el);
      }
    }
    this.setState({display});
  }

  getLink(value) {
    let field = this.props.field;
    let details = this.props.details;
    if (
      value && details && details[field.key] && details[field.key][value]) {
      let el = (
        <Link to={'/edit/' + field.service + '/' + field.model + '/' + details[field.key][value]._id}>
          [{details[field.key][value][field.title]}]
        </Link>);
      return el;
    } else {
      this.actionDetails(value);
      return false;
    }
  }

  actionDetails(id) {
    this.props.actions.details({
      service: this.props.field.service,
      model: this.props.field.model,
      id
    });
  }

  shouldComponentUpdate(props, state) {
    return props.value != this.props.value || props.details != this.props.details || state != this.state;
  }

  render() {
    let props = this.props;
    let state = this.state;
    let styles = {
      root: {}
    };
    return (
      <div style={styles.root}>{state.display}</div>
    );
  }
}

export default connect(({details}) => ({details}), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(RelationshipFieldCell);
