const express = require("express");
const app = express();

const companyMotoRoutes = require("../lib/routes/companyMotoRoutes");
const categoryMotoRoutes = require("../lib/routes/categoryMotoRoutes");
const motorcycleRoutes = require("../lib/routes/motorcycleRoutes");
const appUserRoutes = require("../lib/routes/appUserRoutes");
const bookingMotoRoutes = require("../lib/routes/bookingMotoRoutes");
const authRoutes = require("../lib/routes/authRoutes");
const homePageRoutest = require("../lib/routes/homePageRoutes");
const favoriteListRoutes = require("../lib/routes/favoriteListRoutes");
const favoriteListByUserRoutes = require("../lib/routes/favoriteListByUserRoutes");
const motorcycleListByUserRoutes = require("../lib/routes/motorcycleListByUserRoutes");
const promotionRoutes = require("./routes/promotionRoutes"); // Đảm bảo sử dụng đúng tên

const reviewRoutes = require("../lib/routes/reviewRoutes");
const notificationRoutes = require("../lib/routes/notificationRoutes");
const fcmRoutes = require("../lib/routes/fcmRoutes");
const notificationBookingRoutes = require("../lib/routes/notificationBookingRoutes");
const momoPayment = require("../lib/routes/momoPayment"); // Thay đổi đường dẫn nếu cần
const promoByCompanyRoutes = require("../lib/routes/promoByCompanyRoutes");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/companyMoto", companyMotoRoutes);

app.use("/api/categoryMoto", categoryMotoRoutes);

app.use("/api/motorcycle", motorcycleRoutes);

app.use("/api/appUser", appUserRoutes);

app.use("/api/auth", authRoutes); // Thêm authRoutes

app.use("/api/bookingMoto", bookingMotoRoutes);

app.use("/api/homepage", homePageRoutest);

app.use("/api/favoriteList", favoriteListRoutes);

app.use("/api/favoriteListByUser", favoriteListByUserRoutes);

app.use("/api/motorcycleListByUser", motorcycleListByUserRoutes);

app.use("/api/review", reviewRoutes);

app.use("/api", notificationRoutes);

app.use("/api/fcm", fcmRoutes);

// Sử dụng route cho các API Promotion
app.use("/api/promotion", promotionRoutes); // Sửa lại tên biến đúng
app.use("/api/promoByCompany", promoByCompanyRoutes);
app.use("/api/notification", notificationBookingRoutes);

// Cấu hình middleware để parse dữ liệu JSON
app.use(express.json());

// Đảm bảo rằng CORS được cấu hình nếu cần
const cors = require("cors");
app.use(cors());

// Add a new endpoint to trigger MoMo payment
// app.post('/api/payWithMoMo', (req, res) => {
//   momoPayment((error, response) => { // Đúng
//       if (error) {
//           console.error('Error processing payment:', error);
//           return res.status(500).json({ message: 'Error processing payment.' });
//       }

//       res.status(200).json({
//           message: 'Payment request sent to MoMo.',
//           data: response,
//       });
//   });
// });

app.post("/api/payWithMoMo", (req, res) => {
  momoPayment((error, response) => {
    if (error) {
      console.error("Error generating MoMo payment:", error);
      return res.status(500).json({ message: "Error processing payment." });
    }

    // Nếu MoMo trả về thành công, bao gồm deeplink
    if (response.resultCode === 0) {
      return res.status(200).json({
        message: "MoMo payment initialized.",
        payUrl: response.payUrl, // URL mở ứng dụng MoMo
        deeplink: response.deeplink, // Dành cho mobile app
        qrCodeUrl: response.qrCodeUrl, // Link QR code nếu cần
      });
    } else {
      return res.status(400).json({
        message: "Failed to initialize payment.",
        error: response.message,
      });
    }
  });
});

app.post("/api/momo/callback", (req, res) => {
  const {
    partnerCode,
    orderId,
    requestId,
    amount,
    resultCode,
    message,
    extraData,
  } = req.body;

  // In dữ liệu ra terminal ngay lập tức
  console.log("MoMo Callback Data:", req.body);

  // Kiểm tra xem thanh toán có thành công không
  if (resultCode === 0) {
    console.log(`Payment successful for Order ID: ${orderId}`);
    // Cập nhật trạng thái thanh toán trong cơ sở dữ liệu hoặc các bước tiếp theo
    return res.status(200).json({ message: "Payment successful", orderId });
  } else {
    console.error(
      `Payment failed for Order ID: ${orderId} with message: ${message}`
    );
    return res
      .status(400)
      .json({ message: "Payment failed", orderId, error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
