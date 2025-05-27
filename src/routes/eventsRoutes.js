// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventsController');

router.get('/events', eventController.getEvents);
router.post('/events', eventController.saveEvents);

module.exports = router;
