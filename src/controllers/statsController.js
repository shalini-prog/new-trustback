const StatSection = require('../models/statsModel.js');

// GET stats
const getStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }
    
    const data = await StatSection.findById(id);
    
    // Check if data exists
    if (!data) {
      return res.status(404).json({ message: 'Stats not found with the provided ID' });
    }
    
    res.json(data);
  } catch (error) {
    // Handle invalid ObjectId format (if using MongoDB)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    res.status(500).json({ message: 'Error fetching stats data', error: error.message });
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
