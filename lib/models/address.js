class Address {
    constructor(streetName, district, city, country) {
        this._streetName = streetName;
        this._district = district;
        this._city = city;
        this._country = country;
    }

    toObject() {
        return {
            streetName: this._streetName,
            district: this._district,
            city: this._city,
            country: this._country
        };
    }
}
