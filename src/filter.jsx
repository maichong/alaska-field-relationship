/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Select from 'alaska-field-select/lib/Select';
import { api, PREFIX } from 'alaska-admin-view';
import qs from 'qs';

export default class RelationshipFieldFilter extends React.Component {

  static propTypes = {
    value: React.PropTypes.any,
    field: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onClose: React.PropTypes.func,
  };

  static contextTypes = {
    t: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    let value = props.value || {};
    if (typeof value === 'string') {
      value = { value };
    }
    this.state = {
      value: value.value,
      inverse: value.inverse,
      error: false,
      options: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      let value = props.value;
      if (typeof value === 'string') {
        value = { value };
      }
      this.setState(value);
    }
  }

  handleInverse = () => {
    this.setState({ inverse: !this.state.inverse }, () => this.handleBlur());
  };

  handleSearch = (keyword, callback) => {
    let field = this.props.field;
    let query = qs.stringify({
      service: field.service,
      model: field.model,
      search: keyword,
      filters: field.filters,
      value: this.state.value
    });
    api.post(PREFIX + '/api/relation?' + query).then(res => {
      callback(null, { options: res.results });
    }, callback);
  };

  handleChange = option => {
    this.setState({ value: option ? option.value : undefined }, () => this.handleBlur());
  };

  handleBlur = () => {
    let { value, inverse } = this.state;
    if (value === undefined) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });

    this.props.onChange(inverse ? { value, inverse } : value);
  };

  render() {
    const t = this.context.t;
    const { field, onClose } = this.props;
    const { value, inverse, error, options } = this.state;
    const buttonClassName = 'btn btn-default';
    const buttonClassNameActive = buttonClassName + ' active';
    let className = 'row field-filter field-filter-number' + (error ? ' error' : '');
    return (
      <div className={className}>
        <label className="col-xs-2 control-label text-right">{field.label}</label>
        <form className="form-inline col-xs-10">
          <div className="form-group" style={{ minWidth: 230 }}>
            <Select
              options={options}
              loadOptions={this.handleSearch}
              value={value}
              onChange={this.handleChange}
            />
          </div>
          <a
            className={inverse ? buttonClassNameActive : buttonClassName}
            onClick={this.handleInverse}>{t('inverse')}
          </a>
        </form>
        <a className="btn field-filter-close" onClick={onClose}><i className="fa fa-close"/></a>
      </div>
    );
  }
}
