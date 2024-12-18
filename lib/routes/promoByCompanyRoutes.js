const express = require("express");
const router = express.Router();

// Import các controller từ thư mục PromoByCompanyController
const addPromoByCompany = require("../controllers/PromoByCompanyController/addPromoByCompany");
const editPromoByCompany = require("../controllers/PromoByCompanyController/editPromoByCompany");
const getPromoByCompany = require("../controllers/PromoByCompanyController/getPromoByCompany");
const getAllPromoByCompany = require("../controllers/PromoByCompanyController/getAllPromoByCompany");

// Định nghĩa các route
router.post("/promo", addPromoByCompany); // Thêm chương trình khuyến mãi
router.put("/promo/:id", editPromoByCompany); // Sửa chương trình khuyến mãi theo ID
router.get("/promo/:id", getPromoByCompany); // Lấy thông tin chương trình khuyến mãi theo ID
router.get("/promo", getAllPromoByCompany);
module.exports = router;
