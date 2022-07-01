import { model, models, Schema } from 'mongoose';

const schema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }
});

schema.path('url').validate(async function (url: string) {
  if (!models.url) {
    return false;
  }

  const count = await models.url.countDocuments({ url });

  return !count;
}, 'URL already exists');

const URLModel = model('url', schema);

export default URLModel;
