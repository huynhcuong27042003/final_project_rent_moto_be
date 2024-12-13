const express = require('express');
const router = express.Router();
const momoPayment = require('../../lib/services/momoPayment');
const { checkTransactionStatus } = require('../../lib/services/transactionService'); // Import đúng hàm checkTransactionStatus

router.post('/payWithMoMo', (req, res) => {
  const { amount } = req.body; // Only amount is required now
  
  // Kiểm tra dữ liệu đầu vào
  if (!amount) {
    return res.status(400).json({ message: 'Missing required field: amount.' });
  }

  // Gọi hàm momoPayment với dữ liệu từ client
  momoPayment(amount, (error, response) => { // Only pass amount and callback
    if (error) {
      console.error('Error generating MoMo payment:', error);
      return res.status(500).json({ message: 'Error processing payment.' });
    }

    if (response.resultCode === 0) {
      return res.status(200).json({
        message: 'MoMo payment initialized.',
        payUrl: response.payUrl,
        deeplink: response.deeplink,
        qrCodeUrl: response.qrCodeUrl,
        requestId: response.requestId,  // Thêm requestId vào response
      });
    } else {
      return res.status(400).json({
        message: 'Failed to initialize payment.',
        error: response.message,
      });
    }
  });
});

// POST route to check payment status
router.post('/check-status-transaction', async (req, res) => {
  const { orderId } = req.body;

  // Kiểm tra nếu orderId không có
  if (!orderId) {
    return res.status(400).json({ error: 'orderId is required' });
  }

  try {
    // Gọi hàm từ transactionService để kiểm tra trạng thái giao dịch
    const result = await checkTransactionStatus(orderId);
    return res.status(200).json(result);  // Trả kết quả từ MoMo
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình kiểm tra trạng thái
    console.error('Error checking transaction status:', error.message);
    return res.status(500).json({
      error: 'Error checking transaction status',
      details: error.message,
    });
  }
});

module.exports = router;


