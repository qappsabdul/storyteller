const express = require('express');
const router = express.Router();
const sampleRoutes = require('./sampleRoutes');

// Mount routes
router.use('/api/samples', sampleRoutes);

// Base route
router.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = router;