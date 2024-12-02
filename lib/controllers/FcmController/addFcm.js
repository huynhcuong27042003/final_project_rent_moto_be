const FcmService = require('../../services/fcmService');
const fcmService = new FcmService();

exports.addFcm = async (req, res) => {
    try {
      const { fcmToken, email } = req.body;
  
      if (!fcmToken || !email) {
        return res.status(400).json({ message: 'FCM Token hoặc email bị thiếu.' });
      }
  
      await fcmService.storeFcmTokenForMotorcycleOwner(fcmToken, email);
  
      // Phản hồi thành công
      res.status(200).json({ message: 'FCM Token đã được lưu thành công.' });
    } catch (error) {
      console.error('Lỗi trong addFcm:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lưu FCM Token.', error: error.message });
    }
  };