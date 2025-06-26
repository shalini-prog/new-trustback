const express = require('express');
const router = express.Router();
const { createCause } = require('../controllers/new.js');
const uploadController = require('../controllers/upload.js')



router.post('/upload-image', uploadController.uploadImage);
router.post('/', createCause);

module.exports = router;
