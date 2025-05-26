const mongoose = require('mongoose');

const aboutHeroSchema = new mongoose.Schema({
  mainTitle: { type: String, required: true },
  subtitle: { type: String, required: true },
  backgroundImage: { type: String },
  backgroundVideo: { type: String },
  videoUrl: { type: String },
  heroHeight: { type: String, enum: ['small', 'medium', 'large'], default: 'large' },
  overlayGradient: { type: String },
  overlayOpacity: { type: Number, default: 70 },
  showScrollIndicator: { type: Boolean, default: true },
  sectionVisible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('AboutHero', aboutHeroSchema);
