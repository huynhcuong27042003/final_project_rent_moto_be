const db = require('../firebase'); 
const Invoice = require('../models/invoice');

class InvoiceService {
  static async addInvoice(bookingId, totalAmount, motorbikeRentalDeposit) {
    try {
      // Tạo đối tượng Invoice
      const invoice = new Invoice(bookingId, totalAmount, motorbikeRentalDeposit);

      // Chuyển đổi đối tượng Invoice thành định dạng Firestore
      const invoiceObject = invoice.toObject();

      // Lưu vào Firestore
      const docRef = await db.collection('invoices').add(invoiceObject);
      
      console.log('Invoice added with ID: ', docRef.id);
      return docRef.id;  // Trả về ID của tài liệu vừa được tạo
    } catch (error) {
      console.error('Error adding invoice: ', error);
      throw new Error('Could not add invoice');
    }
  }
}

module.exports = InvoiceService;
