class Address{
    constructor(streetName, city, district, ward) {
        this._streetName = streetName;
        this._city = city;
        this._district = district;
        this._ward = ward;
    }
    toObject() {
        return {
          streetName: this._streetName,
          city: this._city,
          district: this._district,
          ward: this._ward,
        };
    }
}