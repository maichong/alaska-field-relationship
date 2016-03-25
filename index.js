/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const mongoose = require('mongoose');
const TypeObjectId = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

class RelationshipField extends alaska.Field {

  /**
   * 初始化Schema
   */
  initSchema() {
    let schema = this._schema;
    let model = this._model;
    let type = TypeObjectId;
    if (typeof this.ref === 'string') {
      this.ref = model.service.model(this.ref);
    }
    let ref = this.ref;
    if (ref.fields._id) {
      type = ref.fields._id;
      if (type.type) {
        type = type.type;
      }
      if (type.plain) {
        type = type.plain;
      }
    }

    if (ref.registered) {
      //引用已经注册的模型
      this.service = this.ref.service.id;
    } else {
      //引用还未注册的模型
      //只有与当前模型处在同一Service时才会发生
      //所以,直接取当前模型Service
      this.service = this._model.service.id;
    }
    this.model = ref.name;

    let options = {
      type,
      ref: this.ref.name
    };

    [
      'get',
      'set',
      'default',
      'index',
      'required',
      'select'
    ].forEach(key => {
      if (this[key] !== undefined) {
        options[key] = this[key];
      }
    });

    if (this.multi) {
      options = [options];
    }
    this.dataType = type;
    schema.path(this.path, options);
  }

  createFilter(filter) {
    let value = filter;
    if (typeof filter === 'object' && filter.value) {
      value = filter.value;
    }

    if (this.dataType === TypeObjectId) {
      if (value instanceof ObjectId) {
        return value;
      }
      if (ObjectId.isValid(value)) {
        return new ObjectId(value);
      }
    } else if (this.dataType === String) {
      if (typeof value !== 'string' && value.toString) {
        value = value.toString();
      }
      if (typeof value === 'string') {
        return value;
      }
    } else if (this.dataType === Number) {
      value = parseInt(value);
      if (isNaN(value)) {
        return;
      }
      return value;
    }
  }
}

RelationshipField.views = {
  cell: {
    name: 'RelationshipFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'RelationshipFieldView',
    field: __dirname + '/lib/view.js'
  }
};

RelationshipField.plain = TypeObjectId;

RelationshipField.viewOptions = ['filters', 'service', 'model', 'multi', function (options, field) {
  let Model = field.ref;
  options.key = Model.key;
  options.title = Model.title;
}];

module.exports = RelationshipField;
