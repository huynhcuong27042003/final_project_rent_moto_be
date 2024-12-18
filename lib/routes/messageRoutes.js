const express = require('express');
const router = express.Router();
const addMessage = require('../../lib/controllers/Message/addMessage');  // Import controller

router.post('/', addMessage.addMessage);

module.exports = router;
