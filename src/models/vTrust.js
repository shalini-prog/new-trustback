const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: String,
  logo: String,
  website: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  partnership_since: Date,
  description: String,
  contact_email: String
}, { _id: true });


const trustSectionSchema = new mongoose.Schema({
  partners: [partnerSchema],
  efforts: [effortSchema]
}, { timestamps: true });

module.exports = mongoose.model('TrustSection', trustSectionSchema);
