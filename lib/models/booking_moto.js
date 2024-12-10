const { Timestamp } = require('firebase-admin').firestore;  // Import Timestamp từ firebase-admin

class BookingMoto {
    constructor(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept, isHide, totalAmount) {
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

        if (typeof totalAmount !== 'number' || totalAmount < 0) {
            throw new TypeError("totalAmount must be a non-negative number.");
        }

        this._email = email;
        this._numberPlate = numberPlate;
        this._bookingDate = bookingDate;
        this._returnDate = returnDate;
        this._numberOfRentalDay = numberOfRentalDay;
        this._isAccept = isAccept;
        this._isHide = isHide;
        this._totalAmount = totalAmount;
    }

    toObject() {
        return {
            email: this._email,
            numberPlate: this._numberPlate,
            bookingDate: Timestamp.fromDate(new Date(this.bookingDate)), 
            returnDate: Timestamp.fromDate(new Date(this.returnDate)),
            numberOfRentalDay: this._numberOfRentalDay,
            isAccept: this._isAccept,
            isHide: this._isHide,
            totalAmount: this._totalAmount, 
        };
    }
}

module.exports = BookingMoto;
