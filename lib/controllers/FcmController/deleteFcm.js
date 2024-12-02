const FcmService = require('../../services/fcmService'); 
const fcmService = new FcmService();

exports.deleteFcm = async (req, res) => {
  try {
    const { email } = req.params; // Get email from the URL parameter

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email bị thiếu.' });
    }

    // Call the service to remove the FCM token
    await fcmService.removeFcmTokenOnSignOut(email);

    // Send success response
    res.status(200).json({ message: 'FCM Token đã được xóa thành công.' });
  } catch (error) {
    console.error('Lỗi trong deleteFcm:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa FCM Token.', error: error.message });
  }
};
