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
    
    toAddressString() {
        // Tạo một chuỗi địa chỉ đầy đủ cho Nominatim API
        return `${this._streetName}, ${this._district}, ${this._city}, ${this._country}`;
    }
    
}