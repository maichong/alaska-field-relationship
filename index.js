/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

'use strict';

const mongoose = require('mongoose');
const alaska = require('alaska');

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
  if (typeof field.ref == 'string' && field.ref.indexOf('.') > -1) {
    field.ref = Model.service.model(field.ref);
  }
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

/**
 * alaska-admin-view 前端控件初始化参数
 * @param field
 * @param Model
 */
exports.viewOptions = function (field, Model) {
  let options = alaska.Field.viewOptions.apply(this, arguments);
  let ref = field.ref;
  if (typeof ref == 'string') {
    ref = Model.service.model(ref);
  }
  options.service = ref.service.id;
  options.model = ref.name;
  options.many = field.many;
  return options;
};
