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
    let dataType = this.dataType;
    if (dataType === 'ObjectId' || dataType === ObjectId) {
      dataType = TypeObjectId;
    }
    let ref = this.ref;
    if (typeof ref === 'string') {
      //查找引用模型
      //ref 当this.optional为true时,ref有可能为null
      ref = model.service.model(this.ref, this.optional);
    }

    let options;
    let type;
    if (ref) {
      //找到了引用模型
      if (dataType) {
        type = dataType;
      } else if (ref.fields._id) {
        type = ref.fields._id;
        if (type.type) {
          type = type.type;
        }
        if (type.plain) {
          type = type.plain;
        }
      }
      if (!type) {
        type = TypeObjectId;
      }
      options = {
        type,
        ref: ref.name
      };

      if (ref.registered) {
        //引用已经注册的模型
        this.service = ref.service.id;
      } else {
        //引用还未注册的模型
        //只有与当前模型处在同一Service时才会发生
        //所以,直接取当前模型Service
        this.service = this._model.service.id;
      }
      this.model = ref.name;
    } else {
      //如果没有找到引用,说明是可选引用
      this.hidden = true;
      type = dataType || TypeObjectId;
      options = type;
      if (typeof this.ref === 'string') {
        let arr = this.ref.split('.');
        this.model = arr[1];
        this.service = arr[0];
      }
    }

    [
      'get',
      'set',
      'default',
      'index',
      'unique',
      'text',
      'sparse',
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
    this.ref = ref;
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
  if (Model) {
    options.key = Model.key;
    options.title = Model.title;
  }
}];

module.exports = RelationshipField;
