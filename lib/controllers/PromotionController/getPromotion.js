const PromotionService = require('../../services/promotionService');

const getPromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, isHide, discount } = req.query; // Lấy các query parameters, bao gồm discount

    // Nếu có `id`, tìm khuyến mãi theo id
    if (id) {
      const promotion = await PromotionService.getPromotionById(id);
      return res.status(200).json(promotion);
    }

    // Nếu có query parameters, tìm theo các tiêu chí
    let promotions;
    if (code || isHide !== undefined || discount !== undefined) {
      promotions = await PromotionService.getAllPromotionsFiltered(code, isHide, discount);
    } else {
      promotions = await PromotionService.getAllPromotions();
    }

    return res.status(200).json(promotions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPromotion };
