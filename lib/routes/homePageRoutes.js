const express = require('express');
const router = express.Router();
const getAcceptedMotorcycles = require('../controllers/MotorcycleController/getAcceptedMotorcycles.js '); // Adjust path as necessary

// Define routes for CRUD operations on Motorcycle
router.get('/:id?', getAcceptedMotorcycles.getAcceptedMotorcycles); // Get a motorcycle by ID or all motorcycles

module.exports = router; // Export the router
