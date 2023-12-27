const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  nomPrenom: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('ContactForm', ContactSchema);

module.exports = Contact;
