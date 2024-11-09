const express = require('express');
const router = express.Router();
const addUserController = require('../controllers/AppUserController/addUser');
const editUserController = require('../controllers/AppUserController/editUser');
const getUserController = require('../controllers/AppUserController/getUser');

// Define the routes
router.post('/', addUserController.addUser); // Route to add a new user
router.put('/:email', editUserController.editUser ); // Route to get a user by ID or all users
router.get('/:email?', getUserController.getUser); // Route to update a user by ID

module.exports = router;
