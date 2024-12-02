const db = require('../firebase');  
const Notification = require('../models/notification');

class NotificationService {
  // Method to save the notification to Firestore
  async saveNotificationToFirestore(title, body, email, bookingId, bookingDate, returnDate, isHide = true) {
    try {
      // Create a new Notification instance
      const notification = new Notification(title, body, email, bookingId, bookingDate, returnDate);

      // Convert to Firestore object using the toObject method
      const notificationData = notification.toObject();

      // Save notification to Firestore in the 'notifications' collection
      const notificationRef = db.collection('notifications').doc();  // Automatically generate a new document ID
      await notificationRef.set(notificationData);

      console.log('Notification saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving notification to Firestore:', error);
      throw error;  // Rethrow error to be handled in the controller
    }
  }

  static async getNotificationsByEmail(email) {
    try {
      const snapshot = await db
        .collection('notifications')
        .where('email', '==', email)
        .where('isHide', '==', false) 
        .get(); 
  
      if (snapshot.empty) {
        console.log('No notifications found for this email!');
        return [];
      }
  
      // Return the notifications along with their document id
      return snapshot.docs.map(doc => {
        const notificationData = doc.data();
        notificationData.id = doc.id; // Add the doc ID here
        return notificationData;
      });
    } catch (error) {
      console.error('Error fetching notifications by email:', error);
      throw error;
    }
  }
  

  static async updateIsHide(notificationId, isHide) {
    try {
      const notificationRef = db.collection('notifications').doc(notificationId);

      // Kiểm tra xem thông báo có tồn tại hay không
      const doc = await notificationRef.get();
      if (!doc.exists) {
        console.log('Notification not found!');
        return { success: true, message: 'Notification not found' };
      }

      // Cập nhật thuộc tính isHide
      await notificationRef.update({ isHide });

      console.log('Notification updated successfully');
      return { success: true, message: 'Notification updated successfully' };
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error; // Rethrow lỗi để xử lý trong controller
    }
  }

}

module.exports = NotificationService;
