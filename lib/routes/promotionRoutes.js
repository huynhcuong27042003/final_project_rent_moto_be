// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const addPromotion = require('../controllers/PromotionController/addPromotion');
const getPromotion = require('../controllers/PromotionController/getPromotion');
const editPromotion = require('../controllers/PromotionController/editPromotion');
// const deletePromotion = require('../controllers/PromotionController/deletePromotion');


router.post('/', addPromotion.addPromotion);
router.put('/:id', editPromotion.editPromotion);
router.get('/:id?', getPromotion.getPromotion);


// router.delete('/:id', deletePromotion.deletePromotion);

module.exports = router;
