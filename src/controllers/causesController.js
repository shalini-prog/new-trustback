const FeaturedCauseSection = require('../models/causesModel');

// Get featured causes section
exports.getSection = async (req, res) => {
  try {
    const section = await FeaturedCauseSection.findOne();
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update featured causes section
exports.updateSection = async (req, res) => {
  try {
    const data = req.body;
    let section = await FeaturedCauseSection.findOne();

    if (!section) {
      section = new FeaturedCauseSection(data);
    } else {
      section.set(data);
    }

    await section.save();
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset section (optional utility)
exports.resetSection = async (req, res) => {
  try {
    await FeaturedCauseSection.deleteMany();
    res.json({ message: 'Section reset successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
