const InvoiceService = require("../../services/invoiceService");

exports.getInvoiceByEmail = async (req, res) => {
  try {
    // Lấy email từ query parameters
    const { email } = req.query;

    // Kiểm tra nếu không truyền email
    if (!email) {
      return res.status(400).json({
        message: "Missing email parameter",
      });
    }

    // Gọi phương thức getInvoicesByEmail từ InvoiceService
    const invoices = await InvoiceService.getInvoicesByEmail(email);

    // Trả về danh sách hóa đơn
    return res.status(200).json({
      message: `Invoices retrieved successfully for email: ${email}`,
      invoices: invoices,
    });
  } catch (error) {
    // Nếu có lỗi, trả về mã lỗi và thông điệp lỗi
    console.error("Error retrieving invoices by email:", error);
    return res.status(500).json({
      message: "Could not retrieve invoices",
      error: error.message,
    });
  }
};
