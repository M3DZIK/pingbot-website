import { model, models, Schema } from 'mongoose';
import { URLSchema } from './types/mongo';

const schema = new Schema<URLSchema>({
  url: {
    type: String,
    required: true,
    unique: true
  }
});

schema.path('url').validate(async function (value: string) {
  if (models.url) {
    return true;
  }

  const count = await models.url.countDocuments({ url: value });

  return !count;
}, 'URL already exists');

const URLModel = model<URLSchema>('url', schema);

export default URLModel;
