const BookingMoto = require('../models/booking_moto');
const db = require('../firebase');
class BookingMotoService{
    async addBooking(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept) {
        // Kiểm tra thông tin booking
        if (typeof email !== 'string' || email.trim() === '') {
            throw new TypeError('Email must be a non-empty string.');
        }
        if (typeof numberPlate !== 'string' || numberPlate.trim() === '') {
            throw new TypeError('Number plate must be a non-empty string.');
        }
        if (typeof bookingDate !== 'string' || bookingDate.trim() === '') {
            throw new TypeError('bookingDate must be a non-empty string.');
        }
        if (typeof returnDate !== 'string' || returnDate.trim() === '') {
            throw new TypeError('returnDate must be a non-empty string.');
        }
        if (!Number.isInteger(numberOfRentalDay)) {
            throw new TypeError('numberOfRentalDay must be an integer.');
        }
        if (typeof isAccept !== 'boolean') {
            throw new TypeError('isAccept must be a boolean.');
        }

        try {
            // Kiểm tra xem booking đã tồn tại trong Firestore chưa
            const existingBookingQuery = await db.collection('bookings').where('email', '==', email).where('numberPlate', '==', numberPlate).get();
            if (!existingBookingQuery.empty) {
                throw new Error('Booking already exists for this email and motor plate.');
            }

            // Tạo đối tượng BookingMoto mới
            const newBooking = new BookingMoto(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept);
            const docRef = await db.collection('bookings').add(newBooking.toObject());
            console.log('Booking added with ID:', docRef.id);
            
            return { id: docRef.id, ...newBooking.toObject() };
        } catch (error) {
            console.error('Error adding booking to Firestore:', error);
            throw new Error(error.message || 'Could not add booking to Firestore');
        }
    }

    // Lấy booking theo email
    async getBookingByEmail(email) {
        try {
            const querySnapshot = await db.collection('bookings').where('email', '==', email).get();
            if (querySnapshot.empty) {
                throw new Error(`No bookings found for email ${email}.`);
            }
            const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return bookings; // Return array of bookings matching the email
        } catch (error) {
            console.error('Error fetching booking by email:', error);
            throw new Error('Could not fetch bookings by email from Firestore');
        }
    }

    // Lấy booking theo biển số xe
    async getBookingByNumberPlate(numberPlate) {
        try {
            const querySnapshot = await db.collection('bookings').where('numberPlate', '==', numberPlate).get();
            if (querySnapshot.empty) {
                throw new Error(`No bookings found for number plate ${numberPlate}.`);
            }
            const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return bookings; // Return array of bookings matching the number plate
        } catch (error) {
            console.error('Error fetching booking by number plate:', error);
            throw new Error('Could not fetch bookings by number plate from Firestore');
        }
    }

     // Lấy tất cả các booking
    async getAllBookings() {
        try {
            const querySnapshot = await db.collection('bookings').get(); // Fetch all bookings
            const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return bookings; // Return array of all bookings
        } catch (error) {
            console.error('Error fetching all bookings:', error);
            throw new Error('Could not fetch all bookings from Firestore');
        }
    }

    async deleteBooking({ id }) {
        try {
            if (!id) {
                throw new Error('Booking id is required to delete a booking.');
            }
    
            // Tìm kiếm document theo id
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}.`);
            }
    
            // Xóa booking với id tương ứng
            await bookingRef.delete();
    
            console.log(`Booking with id: ${id} has been deleted.`);
            return { message: `Booking with id: ${id} has been deleted.` };
        } catch (error) {
            console.error('Error deleting booking:', error);
            throw new Error('Could not delete booking from Firestore');
        }
    }
    

    async acceptBooking(id) {
        try {
            if (!id) {
                throw new Error('Booking id is required to accept a booking.');
            }
    
            // Tìm booking theo id
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}`);
            }
    
            // Cập nhật isAccept thành true cho booking tìm được
            await bookingRef.update({ isAccept: true });
    
            console.log(`Booking with id: ${id} has been accepted.`);
            return { message: `Booking with id: ${id} has been accepted.` };
        } catch (error) {
            console.error('Error accepting booking:', error);
            throw new Error('Could not accept booking');
        }
    }
}
module.exports = new BookingMotoService();