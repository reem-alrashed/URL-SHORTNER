import express from 'express';
import Url from '../models/Url.js';
const router = express.Router();

router.get('/:url', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.url });
    if (url) {
      await Url.updateOne({ urlId: req.params.url,},{ $inc: { clicks: 1 }});

      return res.redirect(url.origUrl);
    } else res.status(404).json('Page Not found');
    
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal Server Error');
  }
});

export default router;