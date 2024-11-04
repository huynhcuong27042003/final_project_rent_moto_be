const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Tham chiếu đến Firestore

module.exports = db;
