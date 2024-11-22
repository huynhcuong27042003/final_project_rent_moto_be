const PromotionService = require('../../services/promotionService'); // Đảm bảo đường dẫn đúng

const addPromotion = async (req, res) => {
  try {
    const { name, discount, isHide, startDate, endDate, image, code } = req.body;

    // Kiểm tra nếu code không hợp lệ (ví dụ: độ dài không phải 7 ký tự)
    if (!code || code.length !== 7) {
      return res.status(400).json({ error: 'Code must be exactly 7 characters long' });
    }

    // Kiểm tra nếu discount không hợp lệ (ví dụ: không phải một số hoặc nhỏ hơn 0)
    if (discount === undefined || isNaN(discount) || discount < 0) {
      return res.status(400).json({ error: 'Discount must be a valid number greater than or equal to 0' });
    }

    // Tạo promotion mới từ Service (Chú ý thứ tự các tham số)
    const promotion = await PromotionService.addPromotion(name, discount, isHide, startDate, endDate, image, code);

    // Kiểm tra nếu promotion không có code sau khi thêm
    if (!promotion.code) {
      return res.status(400).json({ error: 'Failed to add promotion with code' });
    }

    // Trả về dữ liệu promotion cùng với code đã được thêm vào
    res.status(201).json({
      id: promotion.id,
      name: promotion.name,
      discount: promotion.discount,  // Trả về discount
      isHide: promotion.isHide,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      image: promotion.image,
      code: promotion.code,  // Đảm bảo code được trả về
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addPromotion };
