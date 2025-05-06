const express = require('express');
const router = express.Router();
const { generateStoryFromImage } = require('../controllers/imageToStoryController');
const upload = require('../middleware/uploadMiddleware');

/**
 * @route   POST /api/stories/generate-from-image
 * @desc    Generate a story from an uploaded image using Claude AI
 * @access  Public
 */
router.post('/generate-from-image', upload.single('image'), generateStoryFromImage);

module.exports = router;