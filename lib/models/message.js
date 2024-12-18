const { Timestamp } = require('firebase-admin').firestore;  // Import Timestamp từ firebase-admin

class Message {
  constructor(chatId, text, email, senderName) {
    this.chatId = chatId;  // ID cuộc trò chuyện
    this.text = text;
    this.email = email;  
    this.senderName = senderName;
    this.timestamp = new Date(); // Thời gian gửi tin nhắn
    this.read = false;  // Trạng thái đọc của tin nhắn
  }

  // Chuyển đối tượng Message thành dữ liệu Firestore
  toFirestore() {
    return {
      chatId: this.chatId,
      senderEmail: this.email,  // Lưu email người gửi
      text: this.text,
      senderName: this.senderName,
      timestamp: Timestamp.now(), // Sử dụng Timestamp của Firestore
      read: this.read,
    };
  }
}

module.exports = Message;
