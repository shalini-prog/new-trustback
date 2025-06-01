const express = require('express');
const router = express.Router();
const ctaController = require('../controllers/heroSection');

router.get('/', ctaController.getAllCTASections);
router.post('/', ctaController.saveOrUpdateCTASection);


module.exports = router;
