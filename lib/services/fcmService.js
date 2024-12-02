const admin = require('firebase-admin');
const db = require('../firebase');

class FcmService {

  async storeFcmTokenForMotorcycleOwner(fcmToken, email) {
    try {
      if (!fcmToken || !email) {
        console.log('FCM Token hoặc email bị thiếu');
        return;
      }

      const userSnapshot = await db.collection('users')
        .where('email', '==', email)
        .get();

      if (userSnapshot.empty) {
        console.log(`Không tìm thấy người dùng với email: ${email}`);
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;

      await db.collection('users').doc(userId).set(
        { fcmToken: fcmToken }, 
        { merge: true } 
      );

      console.log(`FCM Token đã được lưu thành công vào Firestore cho user: ${userId}`);
    } catch (error) {
      console.error('Lỗi khi lưu FCM Token:', error);
    }
  }

  async removeFcmTokenOnSignOut(email) {
    try {
      if (!email) {
        console.log('Email bị thiếu');
        return;
      }

      const userSnapshot = await db.collection('users')
        .where('email', '==', email)
        .get();

      if (userSnapshot.empty) {
        console.log(`Không tìm thấy người dùng với email: ${email}`);
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;

      await db.collection('users').doc(userId).set(
        { fcmToken: admin.firestore.FieldValue.delete() },
        { merge: true }
      );

      console.log(`FCM Token đã được xóa thành công cho user: ${userId}`);
    } catch (error) {
      console.error('Lỗi khi xóa FCM Token:', error);
    }
  }

  async getFcmTokenForOwner(email) {
    try {

      const userSnapshot = await db.collection('users')
        .where('email', '==', email) // Search for the user by email
        .get();
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const uid = userDoc.id;
  
        const tokenSnapshot = await db.collection('users')
          .doc(uid)
          .get();
  
        if (tokenSnapshot.exists) {
          return tokenSnapshot.data().fcmToken || ''; 
        }
      }
    } catch (e) {
      console.error('Error getting FCM Token:', e);
    }
  
    return ''; 
  }

}

module.exports = FcmService;
