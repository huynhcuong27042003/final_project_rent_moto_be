const Roles = require('../models/roles');
const Information = require('../models/information');

class AppUser {
    constructor(email, phoneNumber, role, information, isHide, isActive, favoriteList = [], motorcycleList = []) {
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
        if (information !== null && !(information instanceof Information)) {
            throw new TypeError("information must be an instance of Information or null.");
        }
        if (typeof isHide !== 'boolean') {
            throw new TypeError("isHide must be a boolean.");
        }
        if (typeof isActive !== 'boolean') {
            throw new TypeError("isActive must be a boolean.");
        }
        if (!Array.isArray(favoriteList) || !favoriteList.every(item => typeof item === 'string')) {
            throw new TypeError("favoriteList must be an array of strings.");
        }
        // Validate motorcycleList parameter
        if (!Array.isArray(motorcycleList) || !motorcycleList.every(item => typeof item === 'string')) {
            throw new TypeError("motorcycleList must be an array of strings.");
        }

        // Assign values to instance variables
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._role = role;
        this._information = information || null;
        this._isHide = isHide;
        this._isActive = isActive;
        this._favoriteList = favoriteList; // Initialize favoriteList
        this._motorcycleList = motorcycleList; // Initialize motorcycleList
    }

    // Convert instance to a plain object
    toObject() {
        return {
            email: this._email,
            phoneNumber: this._phoneNumber,
            role: this._role,
            information: this._information ? this._information.toObject() : null,
            isHide: this._isHide,
            isActive: this._isActive,
            favoriteList: this._favoriteList, // Include favoriteList in output
            motorcycleList: this._motorcycleList, // Include motorcycleList in output
        };
    }
}

module.exports = AppUser;
