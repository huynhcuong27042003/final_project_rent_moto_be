class BookingMoto{
     constructor(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept){
        if (typeof email !== 'string') {
            throw new TypeError("email must be a non-empty string.");
        }
        if (typeof numberPlate !== 'string' || numberPlate.trim() === '') {
            throw new TypeError("numberPlate must be a non-empty string.");
        }
        if (typeof bookingDate !== 'string' || bookingDate.trim() === '') {
            throw new TypeError("bookingDate must be a non-empty string.");
        }
        if (typeof returnDate !== 'string' || returnDate.trim() === '') {
            throw new TypeError("returnDate must be a non-empty string.");
        }
        if (!Number.isInteger(numberOfRentalDay)) {
            throw new TypeError("numberOfRentalDay must be a int.");
        }
        if (typeof isAccept !== 'boolean') {
            throw new TypeError("isAccept must be a boolean.");
        }
        this._email = email;
        this._numberPlate = numberPlate;
        this._bookingDate = bookingDate;
        this._returnDate = returnDate;
        this._numberOfRentalDay = numberOfRentalDay;
        this._isAccept = isAccept;
    }

    toObject(){
        return {
            email: this._email,
            numberPlate: this._numberPlate,
            bookingDate: this._bookingDate,
            returnDate: this._returnDate,
            numberOfRentalDay: this._numberOfRentalDay,
            isAccept: this._isAccept,
        };
    }
}

module.exports = BookingMoto;