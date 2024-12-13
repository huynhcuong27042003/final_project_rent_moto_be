const PromoByCompanyService = require("../../services/promoByCompanyService");

async function getPromoByCompany(req, res) {
  const { id } = req.params;

  try {
    const promo = await PromoByCompanyService.getPromoByCompanyById(id);
    res.status(200).json(promo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getPromoByCompany;
