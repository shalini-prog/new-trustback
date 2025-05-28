const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  icon: String,
  number: String,
  label: String,
  description: String,
  color: String
}, { _id: false });

const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  year: String
}, { _id: false });

const ImpactSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  backgroundImage: String,
  stats: [StatSchema],
  achievements: [AchievementSchema]
}, { timestamps: true });

module.exports = mongoose.model('Impact', ImpactSchema);
