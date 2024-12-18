const PromoByCompanyService = require("../../services/promoByCompanyService");

async function addPromoByCompany(req, res) {
  const { percentage, startDate, endDate, isHide, companyMoto, promoName } =
    req.body;

  try {
    // Check if promoName is provided
    if (!promoName) {
      return res.status(400).json({ message: "Promo name is required" });
    }

    // Call the service to add the promotion with the necessary fields
    const newPromo = await PromoByCompanyService.addPromoByCompany(
      percentage,
      new Date(startDate),
      new Date(endDate),
      isHide,
      { name: companyMoto },
      promoName // Pass promoName to the service
    );

    // Return the newly created promotion as the response
    res.status(201).json(newPromo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = addPromoByCompany;
