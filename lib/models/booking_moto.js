class BookingMoto {
    constructor(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept, isHide) {
        if (typeof email !== 'string' || email.trim() === '') {
            throw new TypeError("email must be a non-empty string.");
        }
        if (typeof numberPlate !== 'string' || numberPlate.trim() === '') {
            throw new TypeError("numberPlate must be a non-empty string.");
        }
        if (!(bookingDate instanceof Date) || isNaN(bookingDate.getTime())) {
            throw new TypeError("bookingDate must be a valid Date.");
        }
        if (!(returnDate instanceof Date) || isNaN(returnDate.getTime())) {
            throw new TypeError("returnDate must be a valid Date.");
        }
        if (!Number.isInteger(numberOfRentalDay)) {
            throw new TypeError("numberOfRentalDay must be an integer.");
        }
        if (typeof isAccept !== 'boolean') {
            throw new TypeError("isAccept must be a boolean.");
        }
        if (typeof isHide !== 'boolean') {
            throw new TypeError("isHide must be a boolean.");
        }

        this._email = email;
        this._numberPlate = numberPlate;
        this._bookingDate = bookingDate;
        this._returnDate = returnDate;
        this._numberOfRentalDay = numberOfRentalDay;
        this._isAccept = isAccept;
        this._isHide = isHide;
    }

    toObject() {
        return {
            email: this._email,
            numberPlate: this._numberPlate,
            bookingDate: this._bookingDate.toISOString(), // Chuyển đổi Date thành chuỗi ISO
            returnDate: this._returnDate.toISOString(),  // Chuyển đổi Date thành chuỗi ISO
            numberOfRentalDay: this._numberOfRentalDay,
            isAccept: this._isAccept,
            isHide: this._isHide,
        };
    }
}

module.exports = BookingMoto;
