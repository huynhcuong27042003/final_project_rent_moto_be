const NotificationService = require('../../services/notificationService'); 

exports.getAllNotificationByEmail = async (req, res) => {
  try {
    const { email } = req.params; 

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const notifications = await NotificationService.getNotificationsByEmail(email);

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found for this email' });
    }

    notifications.forEach(notification => {
      const bookingDate = notification.bookingDate;
      notification.bookingDate = new Date(bookingDate._seconds * 1000);

      const returnDate = notification.returnDate;
      notification.returnDate = new Date(returnDate._seconds * 1000);

      const timestamp = notification.timestamp;
      notification.timestamp = new Date(timestamp._seconds * 1000);
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
};

