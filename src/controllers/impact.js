const Impact = require('../models/impactModel');

// GET /api/impact
exports.getImpact = async (req, res) => {
  try {
    let impact = await Impact.findOne();
    if (!impact) {
      impact = new Impact(); // If not exists, initialize
      await impact.save();
    }
    res.json(impact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/impact
exports.updateImpact = async (req, res) => {
  try {
    let impact = await Impact.findOne();
    if (!impact) {
      impact = new Impact(req.body);
    } else {
      Object.assign(impact, req.body);
    }
    await impact.save();
    res.json(impact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update impact' });
  }
};

// DELETE /api/impact/stats/:id
exports.deleteStat = async (req, res) => {
  try {
    const impact = await Impact.findOne();
    if (!impact) return res.status(404).json({ error: 'Impact not found' });

    impact.stats = impact.stats.filter((_, index) => String(index) !== req.params.id);
    await impact.save();
    res.json({ message: 'Stat deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting stat' });
  }
};

// DELETE /api/impact/achievements/:id
exports.deleteAchievement = async (req, res) => {
  try {
    const impact = await Impact.findOne();
    if (!impact) return res.status(404).json({ error: 'Impact not found' });

    impact.achievements = impact.achievements.filter((_, index) => String(index) !== req.params.id);
    await impact.save();
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting achievement' });
  }
};

// POST /api/impact/upload-image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const imageUrl = `/uploads/${req.file.filename}`; // ✅ Correct usage

    res.json({ imageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Error uploading image' });
  }
};

