const express = require('express');
const router = express.Router();
const sampleRoutes = require('./sampleRoutes');
const uploadRoutes = require('./uploadRoutes');
const claudeRoutes = require('./claudeRoutes');
const imageToStoryRoutes = require('./imageToStoryRoutes');

// Mount routes
router.use('/api/samples', sampleRoutes);
router.use('/api/uploads', uploadRoutes);
router.use('/api/claude', claudeRoutes);
router.use('/api/stories', imageToStoryRoutes);

// Base route
router.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = router;