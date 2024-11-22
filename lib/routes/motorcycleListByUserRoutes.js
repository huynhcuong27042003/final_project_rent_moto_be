const express = require('express');
const router = express.Router();
const { getMotorcycleListByUser } = require('../controllers/MotorcycleController/getMotorcycleByUser');

router.get('/:userId', getMotorcycleListByUser);

module.exports = router;