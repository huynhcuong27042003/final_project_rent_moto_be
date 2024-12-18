const messageService = require('../../services/messageService'); 

exports.addMessage = async (req, res) => {
  const { text, email, senderName, userAEmail, userBEmail } = req.body;

  try {
    // Gửi tin nhắn đến Firestore
    await messageService.sendMessageToFirestore(text, email, senderName, userAEmail, userBEmail);

    // Trả về thông báo thành công
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
};
