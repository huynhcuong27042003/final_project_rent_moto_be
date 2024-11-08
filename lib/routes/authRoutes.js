
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/AuthController/register');

// Route cho đăng ký
router.post('/', registerController.register);



module.exports = router;