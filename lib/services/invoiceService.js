const db = require("../firebase");
const Invoice = require("../models/invoice");

class InvoiceService {
  static async addInvoice(
    bookingId,
    totalAmount,
    motorbikeRentalDeposit,
    email
  ) {
    try {
      // Tạo đối tượng Invoice
      const invoice = new Invoice(
        bookingId,
        totalAmount,
        motorbikeRentalDeposit,
        email
      );

      // Chuyển đổi đối tượng Invoice thành định dạng Firestore
      const invoiceObject = invoice.toObject();

      // Lưu vào Firestore
      const docRef = await db.collection("invoices").add(invoiceObject);

      console.log("Invoice added with ID: ", docRef.id);
      return docRef.id; // Trả về ID của tài liệu vừa được tạo
    } catch (error) {
      console.error("Error adding invoice: ", error);
      throw new Error("Could not add invoice");
    }
  }

  static async getInvoicesByEmail(email) {
    try {
      // Perform query to Firestore on invoices collection with email filter
      const snapshot = await db
        .collection("invoices")
        .where("email", "==", email)
        .get();

      // Check if no invoices were found
      if (snapshot.empty) {
        console.log(`No invoices found for email: ${email}`);
        return [];
      }

      // Initialize an empty array to store invoices with additional data
      const invoices = [];

      // Iterate over each invoice document
      for (const doc of snapshot.docs) {
        const invoiceData = {
          id: doc.id, // Get the ID of the invoice document
          ...doc.data(), // Include the invoice data
        };

        // Format the timestamp field if it exists
        if (invoiceData.timestamp) {
          invoiceData.timestamp = invoiceData.timestamp.toDate().toISOString();
        }

        // Get the bookingId from the invoice to query the bookings collection
        const bookingId = invoiceData.bookingId; // Assuming bookingId is the reference to the Booking ID

        // Query the bookings collection using the bookingId (which is the document id)
        const bookingSnapshot = await db
          .collection("bookings")
          .doc(bookingId)
          .get();

        // If the booking is found, extract the returnDate and numberPlate
        if (bookingSnapshot.exists) {
          const bookingData = bookingSnapshot.data();

          // Format the returnDate field if it exists
          if (bookingData.returnDate) {
            invoiceData.returnDate = bookingData.returnDate
              .toDate()
              .toISOString();
          }

          invoiceData.numberPlate = bookingData.numberPlate; // Add numberPlate from booking
        } else {
          console.log(`No booking found for bookingId: ${bookingId}`);
        }

        // Push the updated invoice data to the invoices array
        invoices.push(invoiceData);
      }

      console.log(`Invoices retrieved successfully for email: ${email}`);
      return invoices; // Return the list of invoices with additional data
    } catch (error) {
      console.error("Error retrieving invoices: ", error);
      throw new Error("Could not retrieve invoices");
    }
  }
}

module.exports = InvoiceService;
