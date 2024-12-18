const db = require('../firebase');  // Firebase instance
const Message = require('../models/message');  // Message model

async function sendMessageToFirestore(text, email, senderName, userAEmail, userBEmail) {
  try {
    // Tạo ID cuộc trò chuyện duy nhất từ email của hai người
    const chatId = [userAEmail, userBEmail].sort().join("_"); // Tạo chatId từ hai email
    
    // Tạo đối tượng Message
    const message = new Message(chatId, text, email, senderName);

    // Chuyển Message thành dữ liệu Firestore
    const messageData = message.toFirestore();

    // Lưu tin nhắn vào Firestore trong đúng cuộc trò chuyện
    await db.collection('chats').doc(chatId).collection('messages').add(messageData);
  } catch (error) {
    throw new Error('Error saving message: ' + error.message);
  }
}

module.exports = {
  sendMessageToFirestore
};
