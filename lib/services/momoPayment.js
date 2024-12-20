// module.exports = momoPayment;

const https = require('https');
const crypto = require('crypto');

function momoPayment(amount, callback) {
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const partnerCode = 'MOMO';
    const orderInfo = 'Pay via MoMo App';
    const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'; // URL nhận callback từ MoMo
    const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'; // URL redirect sau khi thanh toán
    const requestType = "captureWallet";
    
    // Generate orderId based on current timestamp
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;  // Using orderId as requestId
    const extraData = ''; // Dữ liệu bổ sung, có thể là JSON được encode

    // Create raw signature
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Create signature
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    // Create request body
    const requestBody = JSON.stringify({
        partnerCode,
        partnerName: "MoMoTest",
        storeId: "MomoStore",
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        requestType,
        extraData,
        signature
    });

    // Configure HTTPS request
    const options = {
        hostname: 'test-payment.momo.vn', // URL sandbox MoMo
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        }
    };

    // Send the request
    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                callback(null, response);
            } catch (error) {
                callback(error);
            }
        });
    });

    req.on('error', (error) => {
        callback(error);
    });

    req.write(requestBody);
    req.end();
}

module.exports = momoPayment;


