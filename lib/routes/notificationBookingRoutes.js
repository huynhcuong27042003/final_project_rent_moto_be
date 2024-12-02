const express = require('express');
const router = express.Router();

const addNotification = require('../controllers/NotificationController/addNotification'); 
const getAllNotificationByEmail = require('../controllers/NotificationController/getAllNotificationByEmail'); 
const updateIsHide = require('../controllers/NotificationController/updateIsHide'); 

router.post('/', addNotification.addNotification); 
router.get('/:email', getAllNotificationByEmail.getAllNotificationByEmail); 
router.patch('/:notificationId', updateIsHide.updateIsHide);


module.exports = router;
