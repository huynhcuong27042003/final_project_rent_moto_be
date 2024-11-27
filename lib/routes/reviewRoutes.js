const express = require('express');
const router = express.Router();

const addReview = require('../controllers/ReviewController/addReview');
const editReview = require('../controllers/ReviewController/editReview');
const getReview = require('../controllers/ReviewController/getReview');
const getReviewByNumberPlate = require('../controllers/ReviewController/getReviewByNumberplate');

router.post('/', addReview.addReview); 
router.patch('/:id', editReview.editReview); 
router.get('/:id', getReview.getReview); 
router.get('/numberPlate/:numberPlate', getReviewByNumberPlate.getReviewByNumberPlate);

module.exports = router;
