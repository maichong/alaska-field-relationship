/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Select from 'alaska-field-select/lib/Select';
import qs from 'qs';
import { shallowEqual, api, PREFIX } from 'alaska-admin-view';

export default class RelationshipFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'search');
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      let val = '';
      if (this.props.field.multi) {
        val = [];
        value && value.forEach(o => {
          val.push(o.value)
        });
      } else if (value) {
        val = value.value;
      }
      this.setState({ value });
      this.props.onChange(val);
    }
  };

  handleSearch = (keyword, callback) => {
    let field = this.props.field;
    let query = qs.stringify({
      service: field.service,
      model: field.model,
      search: keyword,
      filters: field.filters
    });
    api.post(PREFIX + '/api/relation?' + query).then(res => {
      callback(null, { options: res.results });
    }, callback);
  };

  render() {
    let { field, value, disabled, errorText } = this.props;
    let help = field.help;
    let className = 'form-group';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    return (
      <div className={className}>
        <label className="control-label col-xs-2">{field.label}</label>
        <div className="col-xs-10">
          <Select
            multi={field.multi}
            value={!value?'':value}
            disabled={disabled}
            onChange={this.handleChange}
            loadOptions={this.handleSearch}
          />
          {helpElement}
        </div>
      </div>
    );
  }
}
