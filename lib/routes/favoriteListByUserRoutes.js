const express = require('express');
const router = express.Router();
const { getFavoriteListByUser } = require('../controllers/FavoriteList/getFavoriteListByUser');

// router.get('/:email', getFavoriteListByUser);
router.get('/:userId', getFavoriteListByUser);


module.exports = router;
