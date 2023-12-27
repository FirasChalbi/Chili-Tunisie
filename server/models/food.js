const mongoose = require('mongoose');

// Define a simple File model schema
const foodSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  description: String,
  filename: String,
  path: String,
  size: Number,
  // Add any other fields you need
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
