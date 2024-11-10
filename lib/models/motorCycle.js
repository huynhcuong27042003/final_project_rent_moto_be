// models/Motorcycle.js
const CompanyMoto = require('../models/companyMoto');
const CategoryMoto = require('../models/categoryMoto');
const InformationMoto = require('../models/informationMoto');

class Motorcycle {
  constructor(numberPlate, companyMoto, category, informationMoto, isActive, isHide) {
    this.setNumberPlate(numberPlate);
    this.setCompanyMoto(companyMoto);
    this.setCategory(category);
    this.setInformationMoto(informationMoto);
    this.setIsActive(isActive);
    this.setIsHide(isHide);
  }

  // Setters with validation
  setNumberPlate(numberPlate) {
    if (typeof numberPlate !== 'string') {
      throw new TypeError("numberPlate must be a string.");
    }
    this._numberPlate = numberPlate;
  }

  setCompanyMoto(companyMoto) {
    if (!(companyMoto instanceof CompanyMoto)) {
      throw new TypeError("companyMoto must be an instance of CompanyMoto.");
    }
    this._companyMoto = companyMoto;
  }

  setCategory(category) {
    if (!(category instanceof CategoryMoto)) {
      throw new TypeError("category must be an instance of CategoryMoto.");
    }
    this._category = category;
  }

  setInformationMoto(informationMoto) {
    if (!(informationMoto instanceof InformationMoto)) {
      throw new TypeError("informationMoto must be an instance of InformationMoto.");
    }
    this._informationMoto = informationMoto;
  }

  setIsActive(isActive) {
    if (typeof isActive !== 'boolean') {
      throw new TypeError("isActive must be a boolean.");
    }
    this._isActive = isActive;
  }

  setIsHide(isHide) {
    if (typeof isHide !== 'boolean') {
      throw new TypeError("isHide must be a boolean.");
    }
    this._isHide = isHide;
  }

  // Convert instance to plain object
  toObject() {
    return {
        numberPlate: this._numberPlate,
        companyMoto: { name: this._companyMoto.name }, // Only include the name
        category: { name: this._category.name },       // Only include the name
        informationMoto: this._informationMoto.toObject(), // Assuming InformationMoto has its own toObject method
        isActive: this._isActive,
        isHide: this._isHide,
    };
  }

}

module.exports = Motorcycle;
