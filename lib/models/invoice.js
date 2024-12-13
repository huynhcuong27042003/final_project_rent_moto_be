const { Timestamp } = require('firebase-admin').firestore;

class Invoice {
  constructor(bookingId, totalAmount, motorbikeRentalDeposit) {
    this.bookingId = bookingId; 
    this.totalAmount = totalAmount; 
    this.motorbikeRentalDeposit = motorbikeRentalDeposit;
    this.timestamp = Timestamp.now();
  }

  toObject() {
    return {
      bookingId: this.bookingId,
      totalAmount: this.totalAmount,
      motorbikeRentalDeposit: this.motorbikeRentalDeposit,
      timestamp: this.timestamp, 
    };
  }
}

module.exports = Invoice;
