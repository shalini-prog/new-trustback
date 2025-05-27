// routes/dailyActivityRoutes.js
const express = require('express');
const router = express.Router();
const {
  getDailyData,
  saveDailyData
} = require('../controllers/activities.js');

router.get('/', getDailyData);
router.post('/', saveDailyData);

module.exports = router;
