const express = require('express');
const router = express.Router();

const { addFcm } = require('../controllers/FcmController/addFcm');
const { deleteFcm } = require('../controllers/FcmController/deleteFcm');
// const { updateFcm } = require('../controllers/FcmController/updateFcm');
const { getFcm } = require('../controllers/FcmController/getFcm');

router.patch('/add', addFcm);
router.delete('/:email', deleteFcm);
// router.patch('/update', updateFcm);
router.get('/:email?', getFcm);

module.exports = router;
