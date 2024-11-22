const PromotionService = require('../../services/promotionService');

const editPromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, discount, isHide, startDate, endDate, image, code } = req.body;

    // Kiểm tra nếu code không hợp lệ (ví dụ: độ dài không phải 7 ký tự)
    if (code && code.length !== 7) {
      return res.status(400).json({ error: 'Code must be exactly 7 characters long' });
    }

    // Kiểm tra nếu discount không hợp lệ (ví dụ: không phải một số hoặc nhỏ hơn 0)
    if (discount === undefined || isNaN(discount) || discount < 0) {
      return res.status(400).json({ error: 'Discount must be a valid number greater than or equal to 0' });
    }

    // Cập nhật khuyến mãi
    const updatedPromotion = await PromotionService.updatePromotion(id, name, discount, isHide, startDate, endDate, image, code);

    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { editPromotion };
