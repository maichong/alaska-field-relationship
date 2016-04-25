/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Select from 'alaska-field-select/lib/Select';
import qs from 'qs';
import { shallowEqual, api, PREFIX } from 'alaska-admin-view';
import _find from 'lodash/find';

export default class RelationshipFieldView extends React.Component {

  static propTypes = {
    model: React.PropTypes.object,
    field: React.PropTypes.object,
    data: React.PropTypes.object,
    errorText: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: null
    };
  }

  componentWillReceiveProps(props, state) {
    if (props.value !== this.props.value) {
      if (state.options && _find(state.options, o => o.value === props.value)) return;
      this.setState({ options: null });
    }
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'search') || this.state.options !== state.options;
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      let val = null;
      if (this.props.field.multi) {
        val = [];
        if (value) value.forEach(o => val.push(o.value));
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
      filters: field.filters,
      value: this.props.value
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

    let inputElement;
    if (field.static) {
      let options = this.state.options;
      let opts = [];
      if (!options) {
        this.handleSearch('', (error, res) => {
          if (res) {
            this.setState(res);
          }
        });
      } else {
        if (typeof value === 'string') {
          value = [value];
        }
        value.forEach(v => {
          let opt = _find(options, o => o.value === v);
          opts.push(opt ? opt : { value: v, label: v });
        });
      }

      inputElement = (<p className="form-control-static">{opts.map(opt => <a
        key={opt.value}
        href={`#/edit/${field.service}/${field.model}/${opt.value}`}
        style={{paddingRight:10}}
      >{opt.label}</a>)}
      </p>);
    } else {
      inputElement = (
        <Select
          multi={field.multi}
          value={value || ''}
          disabled={disabled}
          onChange={this.handleChange}
          loadOptions={this.handleSearch}
        />
      );
    }

    let label = field.nolabel ? '' : field.label;

    if (field.horizontal === false) {
      let labelElement = label ? (
        <label className="control-label">{label}</label>
      ) : null;
      return (
        <div className={className}>
          {labelElement}
          {inputElement}
          {helpElement}
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-10">
          {inputElement}
          {helpElement}
        </div>
      </div>
    );
  }
}
