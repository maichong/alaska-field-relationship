/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

'use strict';

const mongoose = require('mongoose');
//const alaska = require('alaska');

exports.views = {
  cell: {
    name: 'RelationshipFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'RelationshipFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = Number;

/**
 * 初始化Schema
 * @param field   alaksa.Model中的字段配置
 * @param schema
 * @param Model
 */
exports.initSchema = function (field, schema, Model) {
  let type = mongoose.Schema.Types.ObjectId;
  if (typeof field.ref == 'function' && field.ref.fields._id) {
    type = field.ref.fields._id.type.plain;
  }

  let ref = field.ref;
  if (typeof ref === 'function') {
    ref = ref.name;
  }

  let options = {
    type,
    ref
  };

  if (field.many) {
    options = [options];
  }

  schema.path(field.path, options);
};
