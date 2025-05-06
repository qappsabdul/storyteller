const express = require('express');
const router = express.Router();
const sampleRoutes = require('./sampleRoutes');
const uploadRoutes = require('./uploadRoutes');

// Mount routes
router.use('/api/samples', sampleRoutes);
router.use('/api/uploads', uploadRoutes);

// Base route
router.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = router;