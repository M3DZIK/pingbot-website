import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import dbConnect from '../api_lib/dbConnect';
import URLModel from '../api_lib/schema';

export default async function API(request: VercelRequest, response: VercelResponse | any) {
  const { method } = request;

  switch (method) {
    case 'POST':
      if (!request.body || !request.body.url) {
        return response.status(400).json({
          message: 'Invalid body'
        });
      }

      const { url } = request.body;

      try {
        await axios.get(url);
      } catch {
        return response.status(400).json({
          message: 'Invalid URL'
        });
      }

      await dbConnect();

      const dbURL = new URLModel({ url });

      await dbURL.save();

      try {
        return response.status(200).json({
          success: true,
          message: `Added ${url}`
        });
      } catch (err) {
        console.error(err);
        return response.status(400).json({
          success: false,
          message: 'Already exist?'
        });
      }
    case 'DELETE':
      if (!request.query || !request.query.url) {
        return response.status(400).json({
          message: 'Invalid body'
        });
      }

      try {
        const deleted = await URLModel.findOneAndDelete({ url: request.query.url });

        if (deleted != null) {
          return response.status(200).json({
            message: 'Deleted'
          });
        } else {
          return response.status(400).json({
            success: false,
            message: 'URL does not exists',
            url
          });
        }
      } catch (err) {
        console.error(err);
        return response.status(400).json({
          message: 'Error Deleting from DB'
        });
      }
    default:
      await dbConnect();

      response.status(200).json({
        db: await URLModel.find()
      });
      break;
  }
}
