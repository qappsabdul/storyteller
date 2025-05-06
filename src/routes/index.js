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

// UI Routes
router.get('/', (req, res) => {
  res.render('index', { title: 'AI Tools - Home' });
});

router.get('/claude', (req, res) => {
  res.render('claude', { title: 'AI Tools - Claude AI' });
});

router.get('/image-to-story', (req, res) => {
  res.render('image-to-story', { title: 'AI Tools - Image to Story' });
});

router.get('/upload', (req, res) => {
  res.render('upload', { title: 'AI Tools - File Upload' });
});

module.exports = router;