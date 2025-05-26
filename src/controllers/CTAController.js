const CTASection = require('../models/ctaModel.js');

exports.saveCTASection = async (req, res) => {
  try {
    const { id } = req.body;
    const existing = await CTASection.findOne({ id });

    if (existing) {
      await CTASection.findOneAndUpdate({ id }, req.body);
      return res.status(200).json({ message: 'CTA updated successfully' });
    }

    const newCTA = new CTASection(req.body);
    await newCTA.save();
    res.status(201).json({ message: 'CTA created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCTASection = async (req, res) => {
  try {
    const { id } = req.params;
    const cta = await CTASection.findOne({ id });

    if (!cta) return res.status(404).json({ error: 'CTA not found' });
    res.status(200).json(cta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
