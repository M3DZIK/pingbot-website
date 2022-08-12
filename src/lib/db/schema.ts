import mongoose from 'mongoose'

const { model, Schema } = mongoose

const schema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }
})

const URLModel = model('url2', schema)

export default URLModel
