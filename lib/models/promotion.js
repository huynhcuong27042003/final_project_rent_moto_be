// lib/models/promotion.js
class Promotion {
  constructor(name, code, startDate, endDate, imageUrl, isHide, discount) {
    this._name = name;
    this._code = code;
    this._startDate = startDate;
    this._endDate = endDate;
    this._imageUrl = imageUrl;
    this._isHide = Boolean(isHide);
    this._discount = discount; // Changed to discount
  }

  // Getters for the new field
  get discount() {
    return this._discount;
  }

  // Other existing getters
  get name() {
    return this._name;
  }

  get code() {
    return this._code;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get isHide() {
    return this._isHide;
  }

  // toObject now includes the discount field
  toObject() {
    return {
      name: this._name,
      code: this._code,
      startDate: this._startDate,
      endDate: this._endDate,
      imageUrl: this._imageUrl,
      isHide: this._isHide,
      discount: this._discount, // Changed field name to discount
    };
  }

  // toJSON method remains the same
  toJSON() {
    return this.toObject();
  }

  // fromFirebase now includes discount
  static fromFirebase(doc) {
    const data = doc.data();
    if (!data) {
      throw new Error('No data found in Firestore document');
    }

    const { name, code, startDate, endDate, imageUrl, isHide, discount } = data;
    if (name === undefined || code === undefined || startDate === undefined || endDate === undefined || imageUrl === undefined || isHide === undefined || discount === undefined) {
      throw new Error('One or more required fields are undefined in Firestore document');
    }

    return new Promotion(name, code, startDate, endDate, imageUrl, isHide, discount); // Changed to discount
  }
}

module.exports = Promotion; // Ensure proper export
