// services/transactionService.js

const crypto = require('crypto');
const axios = require('axios');

const checkTransactionStatus = async (orderId) => {
  // Cung cấp thông tin trực tiếp mà không sử dụng .env
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';  // Ví dụ: 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
  const accessKey = 'F8BBA842ECF85';  // Ví dụ: 'F8BBA842ECF85'
  
  if (!secretKey || !accessKey) {
    throw new Error('Missing secretKey or accessKey');
  }

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  // Tạo chữ ký HMAC bằng SHA-256
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: 'MOMO',
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: 'vi',
  });

  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/query',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    return result.data;  // Trả về kết quả từ MoMo
  } catch (error) {
    throw new Error(`Error checking transaction status: ${error.message}`);
  }
};

module.exports = {
  checkTransactionStatus,
};
