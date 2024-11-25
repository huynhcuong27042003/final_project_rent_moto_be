const PromotionService = require('../../services/promotionService');

const editPromotion = async (req, res) => {
  try {
    const { code } = req.params;
    const { name, discount, isHide, startDate, endDate, image } = req.body;

    // Kiểm tra nếu giá trị đầu vào hợp lệ
    if (discount === undefined || isNaN(discount) || discount < 0) {
      return res.status(400).json({ error: 'Discount must be a valid number greater than or equal to 0' });
    }
    if (isHide === undefined) {
      return res.status(400).json({ error: 'isHide must be a boolean' });
    }
    if (!name || !startDate || !endDate || !image || !code) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }

    // Cập nhật khuyến mãi
    const updatedPromotion = await PromotionService.updatePromotion(code, name, discount, isHide, startDate, endDate, image);
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { editPromotion };
