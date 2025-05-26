const express = require('express');
const { getStats, saveStats } = require('../controllers/statsController');

const router = express.Router();

router.get('/', getStats);
router.post('/stats', saveStats);

module.exports = router;
