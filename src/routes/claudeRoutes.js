const express = require('express');
const router = express.Router();
const { processPrompt } = require('../controllers/claudeController');

/**
 * @route   POST /api/claude/generate
 * @desc    Process a prompt with Claude Sonnet 3.7
 * @access  Public
 */
router.post('/generate', processPrompt);

module.exports = router;