const express = require('express');
const router = express.Router();
const { uploadImage, uploadMultipleImages } = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');

// Upload a single image
router.post('/single', upload.single('image'), uploadImage);

// Upload multiple images (max 5)
router.post('/multiple', upload.array('images', 5), uploadMultipleImages);

module.exports = router;