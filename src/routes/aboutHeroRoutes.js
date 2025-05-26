const express = require('express');
const multer = require('multer');
const path = require('path');
const { updateHeroSection, getHeroSection } = require('../controllers/aboutHeroController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.post(
  '/update',
  authenticateToken,
  upload.fields([
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'backgroundVideo', maxCount: 1 }
  ]),
  updateHeroSection
);

router.get('/', getHeroSection);

module.exports = router;
