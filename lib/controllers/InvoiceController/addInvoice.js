const InvoiceService = require('../../services/invoiceService');

exports.addInvoice = async (req, res) => {
  try {
    // Lấy dữ liệu từ req.body
    const { bookingId, totalAmount, motorbikeRentalDeposit } = req.body;

    // Kiểm tra nếu thiếu trường nào đó
    if (!bookingId || !totalAmount || !motorbikeRentalDeposit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Gọi phương thức addInvoice của InvoiceService
    const invoiceId = await InvoiceService.addInvoice(bookingId, totalAmount, motorbikeRentalDeposit);

    // Trả về ID của hóa đơn vừa thêm
    return res.status(201).json({
      message: 'Invoice added successfully',
      invoiceId: invoiceId,
    });
  } catch (error) {
    // Nếu có lỗi, trả về mã lỗi và thông điệp lỗi
    console.error('Error adding invoice:', error);
    return res.status(500).json({
      message: 'Could not add invoice',
      error: error.message,
    });
  }
};
