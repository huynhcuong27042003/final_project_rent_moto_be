const express = require('express');
const app = express();
const companyMotoRoutes = require('../lib/routes/companyMotoRoutes'); 
const categoryMotoRoutes = require('../lib/routes/categoryMotoRoutes');
const motorcycleRoutes = require('../lib/routes/motorcycleRoutes');
const appUserRoutes = require('../lib/routes/appUserRoutes');
const authRoutes = require('../lib/routes/authRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sử dụng route cho các API CompanyMoto
app.use('/api/companyMoto', companyMotoRoutes);

// Sử dụng route cho các API CategoryMoto
app.use('/api/categoryMoto', categoryMotoRoutes);

// Sử dụng route cho các API Motor
app.use('/api/motorcycle', motorcycleRoutes);

// Sử dụng route cho các API User
app.use('/api/appUser', appUserRoutes);

// Sử dụng route cho các API Auth (Đăng ký và Đăng nhập)
app.use('/api/auth', authRoutes); // Thêm authRoutes

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




