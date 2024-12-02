const NotificationService = require('../../services/notificationService'); 
const moment = require('moment-timezone');

exports.addNotification = async (req, res) => {
  try {
    const { title, body, email, bookingId, bookingDate, returnDate } = req.body;

    if (!title || !body || !email || !bookingId || !bookingDate || !returnDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const vietnamTimezone = 'Asia/Ho_Chi_Minh';
    const bookingDateObj = moment.tz(bookingDate, vietnamTimezone).toDate();
    const returnDateObj = moment.tz(returnDate, vietnamTimezone).toDate();

    const notificationService = new NotificationService();

    await notificationService.saveNotificationToFirestore(
      title,
      body,
      email,
      bookingId,
      bookingDateObj,
      returnDateObj,
      false 
    );

    // Phản hồi thành công
    res.status(201).json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error in addNotification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
