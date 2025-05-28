const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const impactController = require('../controllers/impact');

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get('/', impactController.getImpact);
router.put('/', impactController.updateImpact);
router.post('/upload-image', upload.single('image'), impactController.uploadImage);
router.delete('/stats/:id', impactController.deleteStat);
router.delete('/achievements/:id', impactController.deleteAchievement);

module.exports = router;
