const express = require('express');
const router = express.Router();
const addMotorcycle = require('../controllers/MotorcycleController/addMotorcycle'); // Adjust path as necessary
const editMotorcycle = require('../controllers/MotorcycleController/editMotorcycle'); // Adjust path as necessary
const getMotorcycle = require('../controllers/MotorcycleController/getMotorcycle'); // Adjust path as necessary

// Define routes for CRUD operations on Motorcycle
router.post('/', addMotorcycle.addMotorcycle); // Create a new motorcycle
router.get('/:id?', getMotorcycle.getMotorcycle); // Get a motorcycle by ID or all motorcycles
router.patch('/:id', editMotorcycle.editMotorcycle); // Update a motorcycle by ID (PATCH method)

module.exports = router; // Export the router
