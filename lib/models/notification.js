const { Timestamp } = require('firebase-admin').firestore;  // Import Timestamp từ firebase-admin

class Notification {
  constructor(title, body, email, bookingId, bookingDate, returnDate, isHide = false) {
    this.title = title;
    this.body = body;
    this.email = email;
    this.bookingId = bookingId;
    this.bookingDate = bookingDate;
    this.returnDate = returnDate;
    this.timestamp = new Date();  
    this.isHide = isHide;        
  }

  toObject() {
    return {
      title: this.title,
      body: this.body,
      email: this.email, 
      bookingId: this.bookingId,
      bookingDate: Timestamp.fromDate(new Date(this.bookingDate)),  
      returnDate: Timestamp.fromDate(new Date(this.returnDate)),    
      timestamp: Timestamp.now(),  
      isHide: this.isHide,       
    };
  }
}

module.exports = Notification;
