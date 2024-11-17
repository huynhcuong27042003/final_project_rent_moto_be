const express = require('express');
const router = express.Router();
const { addFavoriteList } = require('../controllers/FavoriteList/addFavoriteList'); // Correctly import the function
const { getFavoriteList } = require('../controllers/FavoriteList/getFavoriteList');
const { deleteFavoriteList } = require('../controllers/FavoriteList/deleteFavoriteList')// Import the functions

router.patch('/', addFavoriteList);
router.get('/:email', getFavoriteList);
router.delete('/:email/:motorcycleId', deleteFavoriteList);

module.exports = router;
