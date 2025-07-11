const express = require('express');
const router = express.Router();
const controller = require('../../controllers/gallery/gpage');
const uploadController = require('../../controllers/upload.js')
const uploadVideo = require('../../controllers/uploadv.js')
// Items
router.get('/items', controller.getAllItems);
router.post('/items', controller.addItem);
router.put('/items/:id', controller.updateItem);
router.delete('/items/:id', controller.deleteItem);

// Categories
router.get('/categories', controller.getAllCategories);
router.post('/categories', controller.addCategory);
router.delete('/categories/:id', controller.deleteCategory);
router.put('/categories/:id', controller.updateCategory);
router.get('/rotating-gallery', controller.getRotatingGalleryItems);
router.get('/featured', controller.getFeaturedItems);

router.post('/upload-image', uploadController.uploadImage);
router.post('/upload-video', uploadVideo.uploadVideo);

module.exports = router;
