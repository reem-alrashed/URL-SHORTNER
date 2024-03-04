import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

// Short URL Generator
router.post('/short', async (req, res) => {
    let origUrl = req.body.url;
    const base = process.env.BASE;

      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
        const urlId = nanoid();
          const shortUrl = `${base}/${urlId}`;
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });
  
          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
      }

  });
  
  export default router;