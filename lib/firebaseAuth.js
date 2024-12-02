// firebaseAuth.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Kiểm tra xem Firebase Admin đã được khởi tạo chưa
if (admin.apps.length === 0) {
    // Khởi tạo Firebase Admin SDK với thông tin từ service account
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
// Tham chiếu đến Authentication
const auth = admin.auth(); // Khởi tạo auth

// Xuất auth để sử dụng ở nơi khác
module.exports = auth;