const PromoByCompanyService = require("../../services/promoByCompanyService");

async function editPromoByCompany(req, res) {
  const { id } = req.params;
  const { percentage, startDate, endDate, isHide, companyMoto, promoName } =
    req.body;

  try {
    // Check if promoName is provided
    if (!promoName) {
      return res.status(400).json({ message: "Promo name is required" });
    }

    // Call the service to update the promotion with the necessary fields
    const updatedPromo = await PromoByCompanyService.updatePromoByCompany(
      id,
      percentage,
      new Date(startDate),
      new Date(endDate),
      isHide,
      { name: companyMoto },
      promoName // Pass promoName to the service
    );
    // Return the updated promotion as the response
    res.status(200).json(updatedPromo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = editPromoByCompany;
