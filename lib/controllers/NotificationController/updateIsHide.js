const NotificationService = require('../../services/notificationService'); // Import NotificationService

exports.updateIsHide = async (req, res) => {
  try {
    const { notificationId } = req.params; 

    if (!notificationId) {
      return res.status(400).json({ error: 'notificationId is required' });
    }

    const isHide = true;

    const result = await NotificationService.updateIsHide(notificationId, isHide);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error('Error in updateIsHide controller:', error);
    return res.status(500).json({ error: 'An error occurred while updating the notification' });
  }
};
