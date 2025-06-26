const mongoose = require('mongoose');

const timelineItemSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('TimelineItem', timelineItemSchema);
