const { Timestamp } = require("firebase-admin").firestore;

class Invoice {
  constructor(bookingId, totalAmount, motorbikeRentalDeposit, email) {
    this.bookingId = bookingId;
    this.totalAmount = totalAmount;
    this.motorbikeRentalDeposit = motorbikeRentalDeposit;
    this.email = email;
    this.timestamp = Timestamp.now();
  }

  toObject() {
    return {
      bookingId: this.bookingId,
      totalAmount: this.totalAmount,
      motorbikeRentalDeposit: this.motorbikeRentalDeposit,
      email: this.email,
      timestamp: this.timestamp,
    };
  }
}

module.exports = Invoice;
