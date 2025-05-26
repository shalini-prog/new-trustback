const StatSection = require('../models/statsModel.js');

// GET stats
const getStats = async (req, res) => {
  try {
    const data = await StatSection.findOne(); // optionally use `.sort({ createdAt: -1 })`
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats data', error });
  }
};

// POST stats
const saveStats = async (req, res) => {
  try {

    console.log('Received stats:', req.body);
    const { sectionSettings, stats } = req.body;

    let statDoc = await StatSection.findOne();
    if (!statDoc) {
      statDoc = new StatSection({ sectionSettings, stats });
    } else {
      statDoc.sectionSettings = sectionSettings;
      statDoc.stats = stats;
    }

    await statDoc.save();
    res.json({ message: 'Stats saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving stats data', error });
  }
};

module.exports = {
  getStats,
  saveStats
};
