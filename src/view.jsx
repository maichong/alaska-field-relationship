/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

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
          val.push(o._id)
        });
      } else if (value) {
        val = value._id;
      }
      this.props.onChange(val);
    }
  };

  handleSearch = (keyword, callback) => {
    let field = this.props.field;
    let query = qs.stringify({
      service: field.service,
      model: field.model,
      search: keyword
    });
    api.post(PREFIX + '/api/search?' + query).then(res => {
      callback(null, { options: res.results });
    }, callback);
  };

  render() {
    let { field, value, disabled, errorText } = this.props;
    let noteElement = field.note ? <p className="help-block">{field.note}</p> : null;
    let errorLabel = errorText ? <p className="help-block text-danger">{errorText}</p> : null;
    return (
      <div className="form-group">
        <label className="control-label col-xs-2">{field.label}</label>
        <div className="col-xs-10">
          <Select.Async
            multi={field.multi}
            value={value}
            disabled={disabled}
            valueKey="_id"
            labelKey="title"
            onChange={this.handleChange}
            loadOptions={this.handleSearch}
          />
          {noteElement}
          {errorLabel}
        </div>
      </div>
    );
  }
}
