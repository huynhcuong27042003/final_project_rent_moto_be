const PromoByCompanyService = require("../../services/promoByCompanyService");

async function getAllPromoByCompany(req, res) {
  try {
    // Gọi phương thức để lấy tất cả các chương trình khuyến mãi
    const promos = await PromoByCompanyService.getAllPromosByCompany();

    // Trả về kết quả dưới dạng JSON
    res.status(200).json(promos);
  } catch (error) {
    // Nếu có lỗi, trả về thông báo lỗi
    console.error("Error fetching promotions:", error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllPromoByCompany;
