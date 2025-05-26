const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  text: String,
  url: String,
  style: String
});

const animationSchema = new mongoose.Schema({
  title: String,
  description: String,
  buttons: String
});

const ctaSectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  primaryButton: buttonSchema,
  secondaryButton: buttonSchema,
  backgroundStyle: String,
  gradientFrom: String,
  gradientTo: String,
  backgroundColor: String,
  backgroundImage: String,
  textColor: String,
  enabled: Boolean,
  animation: animationSchema
}, { timestamps: true });

module.exports = mongoose.model('CTASection', ctaSectionSchema);
