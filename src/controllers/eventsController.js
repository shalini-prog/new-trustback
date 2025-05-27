// controllers/eventController.js
const Event = require('../models/eventsModel');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Save or update all events
exports.saveEvents = async (req, res) => {
  try {
    const incomingEvents = req.body;

    // Remove 'id' field and let MongoDB handle _id
    const eventsToSave = incomingEvents.map(event => {
      const { id, ...eventData } = event;
      return eventData;
    });

    await Event.deleteMany({});
    await Event.insertMany(eventsToSave);

    res.status(200).json({ message: 'Events saved successfully' });
  } catch (error) {
    console.error('Save events error:', error); // Add this for debugging
    res.status(500).json({ error: 'Failed to save events', details: error.message });
  }
};
