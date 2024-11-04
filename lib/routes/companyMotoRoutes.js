const express = require('express');
const router = express.Router();
const addCompanyMoto = require('../controllers/CompanyMotoController/addCompanyMoto');
const getCompanyMoto = require('../controllers/CompanyMotoController/getCompanyMoto');
const editCompanyMoto = require('../controllers/CompanyMotoController/editCompanyMoto');

// Định nghĩa các route cho CRUD trên CompanyMoto
router.post('/', addCompanyMoto.addCompanyMoto);
router.get('/:id?', getCompanyMoto.getCompanyMoto);
router.put('/:id', editCompanyMoto.editCompanyMoto);


module.exports = router;
