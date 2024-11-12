const Roles = require('../models/roles');
const Information = require('../models/information');

class AppUser {
    constructor(email, phoneNumber, role, information, isHide, isActive) {
        // Validate the parameters
        if (typeof email !== 'string' || email.trim() === '') {
            throw new TypeError("email must be a non-empty string.");
        }
        if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
            throw new TypeError("phoneNumber must be a non-empty string.");
        }
        if (!Object.values(Roles).includes(role)) {
            throw new TypeError("role must be one of the predefined Roles.");
        }
        if (!(information instanceof Information)) {
            throw new TypeError("information must be an instance of Information.");
        }
        if (typeof isHide !== 'boolean') {
            throw new TypeError("isHide must be a boolean.");
        }
        if (typeof isActive !== 'boolean') {
            throw new TypeError("isActive must be a boolean.");
        }

        // Assign values to instance variables
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._role = role;
        this._information = information;
        this._isHide = isHide;
        this._isActive = isActive; // New property for active status
    }

    // Convert instance to a plain object
    toObject() {
        return {
            email: this._email,
            phoneNumber: this._phoneNumber,
            role: this._role,
            information: this._information.toObject(), // Convert Information instance to object
            isHide: this._isHide,
            isActive: this._isActive, // Include isActive in the object representation
        };
    }
}

module.exports = AppUser;
