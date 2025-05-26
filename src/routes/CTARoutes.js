const express = require('express');
const router = express.Router();
const { saveCTASection, getCTASection } = require('../controllers/CTAController.js');

router.post('/cta', saveCTASection);
router.get('/:id', getCTASection);

module.exports = router;
