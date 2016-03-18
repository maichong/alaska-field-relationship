/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'alaska-admin-view';

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

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.settings) {
      newState.settings = nextContext.settings;
    }
    if (nextProps.details) {

    }
    this.setState(newState);
  }

  shouldComponentUpdate(props) {
    return props.value != this.props.value || props.details != this.props.details;
  }

  render() {
    let props = this.props;
    let state = this.state;
    let styles = {
      root: {}
    };
    return (
      <div style={styles.root}>TODO</div>
    );
  }
}

export default connect(({ details }) => ({ details }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(RelationshipFieldCell);
