const express = require('express');
const router = express.Router();
const { getVolunteerData, saveVolunteerData } = require('../controllers/volunteer.js');

router.get('/volunteer-management', getVolunteerData);
router.post('/volunteer-management', saveVolunteerData);

module.exports = router;
