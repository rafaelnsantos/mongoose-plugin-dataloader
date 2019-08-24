# mongoose-plugin-dataloader

Adds `load` and `loadMany` to models.

## Getting Started

> npm install mongoose-plugin-dataloader --save

````js
const { Schema, model } = require('mongoose')
const dataloaderPlugin = require('mongoose-plugin-dataloader')

const schema = {
  email: {
    type: String,
    required: true,
    unique: true
  }
}

const userSchema = new Schema(schema, { timestamps: true })

userSchema.plugin(dataloaderPlugin)

module.exports = model('User', userSchema)
````

````js
const User = require('./user-model');
// info from GraphQL resolver
User.loadMany(ids, info)
User.load(id, info)
````
