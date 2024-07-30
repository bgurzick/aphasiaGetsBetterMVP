
import express from 'express';
import userProfile from '../models/userProfile.mjs';

const router = express.Router();


// CREATE a new user profile
router.post('/create', async (req, res) => {
    try {
      const newUser = new userProfile(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // READ / GET all user profiles
  router.get('/', async (req, res) => {
    try {
      const users = await userProfile.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // READ / GET a specific profile by ID
  router.get('/:id', async (req, res) => {
    try {
      const user = await userProfile.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // UPDATE user profile
  router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await userProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE a user profile
  router.delete('/:id', async (req, res) => {
    try {
      await userProfile.findByIdAndDelete(req.params.id);
      res.json({ message: 'user deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  export default router;