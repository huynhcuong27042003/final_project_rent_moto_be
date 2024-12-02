const FcmService = require('../../services/fcmService'); 
const fcmService = new FcmService();

exports.getFcm = async (req, res) => {
    try {
      const { email } = req.params;
  
      if (!email) {
        return res.status(400).json({ message: 'Email bị thiếu.' });
      }
  
      const fcmToken = await fcmService.getFcmTokenForOwner(email);
      if (fcmToken) {
        res.status(200).json({ fcmToken: fcmToken });
      } else {
        res.status(404).json({ message: 'Không tìm thấy FCM Token cho người dùng này.' });
      }
    } catch (error) {
      console.error('Lỗi trong getFcm:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy FCM Token.', error: error.message });
    }
  };
  