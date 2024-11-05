
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/AuthController/register');
const loginController = require("../controllers/AuthController/login");

// Route cho đăng ký
router.post('/', registerController.register);

// // Route cho đăng nhập
router.post('/login', loginController.login);

module.exports = router;