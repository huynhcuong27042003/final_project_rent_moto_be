const CompanyMoto = require("../models/companyMoto");

class PromoByCompany {
  constructor(percentage, startDate, endDate, isHide, companyMoto, promoName) {
    this.setPercentage(percentage);
    this.setStartDate(startDate);
    this.setEndDate(endDate);
    this.setIsHide(isHide);
    this.setCompanyMoto(companyMoto);
    this.setPromoName(promoName); // Added promoName to the constructor
  }

  // Setters with validation
  setPercentage(percentage) {
    if (typeof percentage !== "number" || percentage < 0 || percentage > 100) {
      throw new TypeError("percentage must be a number between 0 and 100.");
    }
    this._percentage = percentage;
  }

  setStartDate(startDate) {
    if (!(startDate instanceof Date)) {
      throw new TypeError("startDate must be a Date object.");
    }
    this._startDate = startDate;
  }

  setEndDate(endDate) {
    if (!(endDate instanceof Date)) {
      throw new TypeError("endDate must be a Date object.");
    }
    // Ensure endDate is after startDate
    if (this._startDate >= endDate) {
      throw new Error("endDate must be after startDate.");
    }
    this._endDate = endDate;
  }

  setIsHide(isHide) {
    if (typeof isHide !== "boolean") {
      throw new TypeError("isHide must be a boolean.");
    }
    this._isHide = isHide;
  }

  setCompanyMoto(companyMoto) {
    if (
      typeof companyMoto !== "object" ||
      !companyMoto.hasOwnProperty("name")
    ) {
      throw new TypeError(
        "companyMoto must be an object with a 'name' property."
      );
    }
    this._companyMoto = companyMoto;
  }

  setPromoName(promoName) {
    if (typeof promoName !== "string" || promoName.trim() === "") {
      throw new TypeError("promoName must be a non-empty string.");
    }
    this._promoName = promoName;
  }

  // Convert instance to plain object
  toObject() {
    return {
      promoName: this._promoName, // Include promoName in the output
      percentage: this._percentage,
      startDate: this._startDate.toISOString(),
      endDate: this._endDate.toISOString(),
      isHide: this._isHide,
      companyMoto: { name: this._companyMoto.name }, // Only include the name of CompanyMoto
    };
  }
}

module.exports = PromoByCompany;
