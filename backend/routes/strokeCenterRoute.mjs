
import express from 'express';
import strokeCenter from '../models/strokeCenter.mjs';

const router = express.Router();

// GET all stroke centers (and log after GET)
router.get('/', async (req, res) => {
    try {
      const centers = await strokeCenter.find();
      console.log('Fetched stroke centers:', centers);
      res.json(centers);
    } catch (error) {
      console.error('Error fetching stroke centers:', error);
      res.status(500).json({ message: 'Error fetching stroke centers', error: error.message });
    }
  });

// GET stroke centers by state
router.get('/state/:state', async (req, res) => {
  const { state } = req.params;
  try {
    const centers = await strokeCenter.find({ state });
    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stroke centers by state', error: error.message });
  }
});


export default router;
