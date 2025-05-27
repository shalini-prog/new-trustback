// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  image: String,
  description: String,
  featured: Boolean,
  visible: Boolean,
  registrations: Number,
  maxCapacity: Number,
  category: String
});

module.exports = mongoose.model('Event', eventSchema);
