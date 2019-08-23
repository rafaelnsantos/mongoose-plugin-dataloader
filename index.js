const DataLoader = require('dataloader')
const ObjectId = require('mongodb').ObjectID
const infoToProjection = require('infotoprojection')

const Loader = (model, info, key = '_id') =>
  new DataLoader(async ids =>
    model
      .find(
        { [key]: { $in: key == '_id' ? ids.map(id => ObjectId(id)) : ids } },
        infoToProjection(info)
      )
      .sort({ _id: -1 })
  )

module.exports = function (schema) {
  schema.statics.load = function (id, info, key) {
    return Loader(this, info, key).load(id)
  }

  schema.statics.loadMany = function (ids, info, key) {
    return Loader(this, info, key).loadMany(ids)
  }
}
