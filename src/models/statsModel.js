const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  sectionSettings: {
    title: String,
    subtitle: String,
    isActive: Boolean,
    backgroundColor: String,
    animationType: String
  },
  stats: [
    {
      id: String,
      icon: String,
      value: String,
      label: String,
      suffix: String,
      color: String,
      isActive: Boolean,
      order: Number
    }
  ]
}, { timestamps: true });

const StatSection = mongoose.model('StatSection', statSchema);

module.exports = StatSection;
