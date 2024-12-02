const BookingMoto = require('../models/booking_moto');
const db = require('../firebase');
class BookingMotoService{
    async addBooking(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept, isHide) {
        try {
            // Chuyển đổi chuỗi ISO thành đối tượng Date
            const bookingDateObj = new Date(bookingDate);
            const returnDateObj = new Date(returnDate);
    
            if (isNaN(bookingDateObj.getTime()) || isNaN(returnDateObj.getTime())) {
                throw new Error('bookingDate and returnDate must be valid Date objects.');
            }
    
            // Tạo đối tượng BookingMoto mới
            const newBooking = new BookingMoto(email, numberPlate, bookingDateObj, returnDateObj, numberOfRentalDay, isAccept, isHide);
            const docRef = await db.collection('bookings').add(newBooking.toObject());
            console.log('Booking added with ID:', docRef.id);
    
            return { id: docRef.id, ...newBooking.toObject() };
        } catch (error) {
            console.error('Error adding booking to Firestore:', error);
            throw new Error(error.message || 'Could not add booking to Firestore');
        }
    }

    async getBookingById(id) {
        try {
            if (!id) {
                throw new Error('Booking id is required to fetch booking.');
            }
    
            // Tìm booking theo id
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}`);
            }
    
            // Trả về thông tin booking, bao gồm cả id
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error fetching booking by id:', error);
            throw new Error('Could not fetch booking by id from Firestore');
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

    async getAllBookings() {
        try {
            const querySnapshot = await db.collection('bookings').get();
            const bookings = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                bookingDate: new Date(doc.data().bookingDate), // Chuyển chuỗi ISO thành Date
                returnDate: new Date(doc.data().returnDate) // Chuyển chuỗi ISO thành Date
            }));
            return bookings;
        } catch (error) {
            console.error('Error fetching all bookings:', error);
            throw new Error('Could not fetch all bookings from Firestore');
        }
    }

    // Ẩn booking
    async hideBooking(id) {
        try {
            if (!id) {
                throw new Error('Booking id is required to hide a booking.');
            }

            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();

            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}.`);
            }

            await bookingRef.update({ isHide: true });
            console.log(`Booking with id: ${id} has been hidden.`);
            return { message: `Booking with id: ${id} has been hidden.` };
        } catch (error) {
            console.error('Error hiding booking:', error);
            throw new Error('Could not hide booking in Firestore');
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
            await bookingRef.update({isHide: true});
            console.log(`Booking with id: ${id} has been accepted.`);
            return { message: `Booking with id: ${id} has been accepted.` };
        } catch (error) {
            console.error('Error accepting booking:', error);
            throw new Error('Could not accept booking');
        }
    }
}
module.exports = new BookingMotoService();