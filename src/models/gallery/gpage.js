const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  type: { type: String, enum: ['item', 'category'], required: true }, // 'item' or 'category'

  // Common fields
  name: String,           // For categories
  description: String,

  // For items only
  title: String,
  category: String,
  uploadDate: { type: Date, default: Date.now },
  thumbnail: String,
  imageUrl: String,
  featured: Boolean,
  rotatingGallery: Boolean,
  tags: [String],
  itemCount: { type: Number, default: 0 } // for categories only
});

module.exports = mongoose.model('Gallery', gallerySchema);
