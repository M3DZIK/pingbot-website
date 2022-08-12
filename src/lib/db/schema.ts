import mongoose from 'mongoose'

const { model, models, Schema } = mongoose

const Collection = process.env.MONGODB_COLLECTION || 'url'

const schema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }
})

schema.path(Collection).validate(async function (url: string) {
  if (!models.url) {
    return false
  }

  const count = await models.url.countDocuments({ url })

  return !count
}, 'URL already exists')

const URLModel = model(Collection, schema)

export default URLModel
