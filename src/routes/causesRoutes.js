const express = require('express');
const router = express.Router();
const controller = require('../controllers/causesController.js');

router.get('/', controller.getSection);
router.put('/', controller.updateSection);
router.delete('/reset', controller.resetSection); // Optional for admin reset

module.exports = router;
