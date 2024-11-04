const Roles = require('../models/roles');
const Information = require('../models/information');

class AppUser {
    constructor(email, name, phoneNumber, role, address, information, isHide) {
        if (typeof email !== 'string' || email.trim() === '') {
            throw new TypeError("email must be a non-empty string.");
        }
        if (typeof name !== 'string' || name.trim() === '') {
            throw new TypeError("name must be a non-empty string.");
        }
        if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
            throw new TypeError("phoneNumber must be a non-empty string.");
        }
        if (!Object.values(Roles).includes(role)) {
            throw new TypeError("role must be one of the predefined Roles.");
        }
        if (typeof address !== 'object' || address === null) {
            throw new TypeError("address must be a non-null object.");
        }
        if (!(information instanceof Information)) {
            throw new TypeError("information must be an instance of Information.");
        }
        if (typeof isHide !== 'boolean') {
            throw new TypeError("isHide must be a boolean.");
        }

        this._email = email;
        this._name = name;
        this._phoneNumber = phoneNumber;
        this._role = role;
        this._address = address; // Assuming address is an object that contains address details
        this._information = information;
        this._isHide = isHide;
    }

    // Convert instance to a plain object
    toObject() {
        return {
            email: this._email,
            name: this._name,
            phoneNumber: this._phoneNumber,
            role: this._role,
            address: this._address, // Include the address details directly
            information: this._information.toObject(), // Convert Information instance to object
            isHide: this._isHide,
        };
    }
}

module.exports = AppUser;