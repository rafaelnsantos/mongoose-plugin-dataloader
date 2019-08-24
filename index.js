const DataLoader = require('dataloader')
const ObjectId = require('mongodb').ObjectID
const infoToProjection = require('infotoprojection')

const Loader = (model, info, key = '_id', sort = { _id: -1 }) =>
  new DataLoader(ids =>
    model
      .find(
        { [key]: { $in: key == '_id' ? ids.map(id => ObjectId(id)) : ids } },
        infoToProjection(info)
      )
      .sort(sort)
  )

module.exports = function (schema) {
  schema.statics.load = function (id, info, key, sort) {
    return Loader(this, info, key, sort).load(id)
  }

  schema.statics.loadMany = function (ids, info, key, sort) {
    return Loader(this, info, key, sort).loadMany(ids)
  }
}
