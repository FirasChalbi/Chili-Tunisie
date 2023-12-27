const express = require('express');
const multer = require('multer');
const Food = require('../models/food');
const upload = require('../middleware/multer');
const path = require('path');

const router = express.Router();

// Serve uploaded files statically
router.use('uploads', express.static(path.join(__dirname, 'uploads')));

// Upload endpoint
router.post('/upload', upload.single('avatar'), async (req, res) => {
  const { name, price, category, description } = req.body;
  const { filename } = req.file;

  // Create a new instance of the File model
  const newFood = new Food({
    name,
    price,
    category,
    description,
    filename,
  });

  try {
    // Save the file details to MongoDB
    await newFood.save();
    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error saving file details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get images endpoint
router.get('/images', async (req, res) => {
  try {
    // Fetch all file details from MongoDB
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
