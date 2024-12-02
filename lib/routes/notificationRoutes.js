const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/send-notification', async (req, res) => {
  const { fcmToken, notification, accountInfo } = req.body;

  // Validate that all necessary information exists
  if (!fcmToken || !notification || !accountInfo || !accountInfo.email) {
    return res
      .status(400)
      .send({ error: 'Missing fcmToken, notification, accountInfo.email' });
  }

  try {
    // Send notification with data payload containing email and bookingId
    await admin.messaging().send({
      token: fcmToken,
      notification: notification,
      data: {
        targetEmail: accountInfo.email,
      },
    });

    console.log(`Notification sent for target email: ${accountInfo.email} with bookingId: ${accountInfo.bookingId}`);
    res.status(200).send({ 
      success: 'Notification sent', 
      email: accountInfo.email
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({ error: 'Failed to send notification' });
  }
});

module.exports = router;

