const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Food = require('./models/food');
const contact = require('./models/contact');
const upload = require('./middleware/multer');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
}));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.post('/foods', upload.single('avatar'), async (req, res) => {
  const { name, price, category, description } = req.body;
  const { filename } = req.file;

  try {
    const newFood = new Food({
      name,
      price,
      category,
      description,
      filename,
    });

    await newFood.save();
    res.json(newFood);
  } catch (error) {
    console.error('Error creating food with image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/foods/:id', async (req, res) => {
  const foodId = req.params.id;

  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error('Error fetching food details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/foods/:id', upload.single('avatar'), async (req, res) => {
  const foodId = req.params.id;
  const { name, price, category, description } = req.body;
  

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { name, price, category, description },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }

    res.json(updatedFood);
  } catch (error) {
    console.error('Error updating food details with image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/foods/:id', async (req, res) => {
  const foodId = req.params.id;

  try {
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }

    

    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Error deleting food with image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/contact', async (req, res) => {
  const { nomPrenom, email, message } = req.body;

  try {
    const newContactForm = new contact({
      nomPrenom,
      email,
      message,
    });

    const savedContactForm = await newContactForm.save();
    console.log('Contact form saved successfully:', savedContactForm);
    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
