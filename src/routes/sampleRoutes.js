const express = require('express');
const router = express.Router();
const { getAllItems, getItemById } = require('../controllers/sampleController');

// Get all items
router.get('/', getAllItems);

// Get item by id
router.get('/:id', getItemById);

module.exports = router;