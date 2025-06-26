const express = require('express');
const router = express.Router();
const controller = require('../controllers/mission.js');

router.get('/', controller.getMissionVision);
router.post('/', controller.saveMissionVision);

module.exports = router;
