const express = require("express");
const app = express();
const cors = require('cors');

const companyMotoRoutes = require('../lib/routes/companyMotoRoutes'); 
const categoryMotoRoutes = require('../lib/routes/categoryMotoRoutes');
const motorcycleRoutes = require('../lib/routes/motorcycleRoutes');
const appUserRoutes = require('../lib/routes/appUserRoutes');
const bookingMotoRoutes = require('../lib/routes/bookingMotoRoutes');
const authRoutes = require('../lib/routes/authRoutes');
const homePageRoutest = require('../lib/routes/homePageRoutes');
const favoriteListRoutes = require('../lib/routes/favoriteListRoutes');
const favoriteListByUserRoutes = require('../lib/routes/favoriteListByUserRoutes');
const motorcycleListByUserRoutes = require('../lib/routes/motorcycleListByUserRoutes');
const promotionRoutes = require('./routes/promotionRoutes'); 
const reviewRoutes = require('../lib/routes/reviewRoutes');
const notificationRoutes = require('../lib/routes/notificationRoutes');
const fcmRoutes = require('../lib/routes/fcmRoutes');
const notificationBookingRoutes = require('../lib/routes/notificationBookingRoutes');
const momoRoutes = require('../lib/routes/momoRoutes'); 
const invoiceRoutes = require('../lib/routes/invoiceRoutes');
const promoByCompanyRoutes = require("../lib/routes/promoByCompanyRoutes");
const messageRoutes = require('../lib/routes/messageRoutes');

const PORT = process.env.PORT || 3000;

app.use(cors());

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

app.use("/api/promotion", promotionRoutes); // Sửa lại tên biến đúng

app.use("/api/promoByCompany", promoByCompanyRoutes);

app.use("/api/notification", notificationBookingRoutes);

app.use('/api', momoRoutes);

app.use('/api/invoices', invoiceRoutes);

app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
