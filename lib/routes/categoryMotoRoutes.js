const express = require('express');
const router = express.Router();
const addCategoryMoto = require('../controllers/CategoryMotoController/addCategoryMoto');
const getCategoryMoto = require('../controllers/CategoryMotoController/getCategory');
const editCategoryMoto = require('../controllers/CategoryMotoController/editCategoryMoto');

// Định nghĩa các route cho CRUD trên CompanyMoto
router.post('/', addCategoryMoto.addCategoryMoto);
router.get('/:id?', getCategoryMoto.getCategoryMoto);
router.put('/:id', editCategoryMoto.editCategoryMoto);

module.exports = router;
