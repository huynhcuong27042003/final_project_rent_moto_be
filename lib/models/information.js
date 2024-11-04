// information.js
class Information {
    constructor(name, dayOfBirth, avatar, gplx) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new TypeError("name must be a non-empty string.");
        }
        if (typeof dayOfBirth !== 'string' || dayOfBirth.trim() === '') {
            throw new TypeError("dayOfBirth must be a non-empty string.");
        }
        if (typeof avatar !== 'string') {
            throw new TypeError("avatar must be a string.");
        }
        if (typeof gplx !== 'string') {
            throw new TypeError("gplx must be a string.");
        }

        this._name = name;
        this._dayOfBirth = dayOfBirth; // Corrected typo from "Brith" to "Birth"
        this._avatar = avatar;
        this._gplx = gplx; // License (GPLX) number
    }

    // Convert instance to a plain object
    toObject() {
        return {
            name: this._name,
            dayOfBirth: this._dayOfBirth,
            avatar: this._avatar,
            gplx: this._gplx,
        };
    }
}

module.exports = Information;