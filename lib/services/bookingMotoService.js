const BookingMoto = require('../models/booking_moto');
const db = require('../firebase');
const admin = require('firebase-admin');

class BookingMotoService{ 
    async addBooking(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept, isHide, totalAmount) {
        try {
            const timestampBookingDate = admin.firestore.Timestamp.fromDate(bookingDate);
            const timestampReturnDate = admin.firestore.Timestamp.fromDate(returnDate);

            const newBooking = {
                email,
                numberPlate,
                bookingDate: timestampBookingDate,
                returnDate: timestampReturnDate,
                numberOfRentalDay,
                isAccept,
                isHide,
                totalAmount
            };

            const docRef = await admin.firestore().collection('bookings').add(newBooking);

            console.log('Booking added with ID:', docRef.id);
            return { id: docRef.id, ...newBooking };
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
    
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}`);
            }
    
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error fetching booking by id:', error);
            throw new Error('Could not fetch booking by id from Firestore');
        }
    }
    
    async getBookingByEmail(email) {
        try {
            const querySnapshot = await db.collection('bookings')
                .where('email', '==', email)
                .where('isAccept', '==', true)
                .where('isHide', '==', false)
                .get();
    
            if (querySnapshot.empty) {
                console.log(`No accepted bookings found for email ${email}`);
                return { bookings: [] };  
            }
    
            const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return { bookings }; 
    
        } catch (error) {
            console.error('Error fetching booking by email:', error);
            return { error: 'Could not fetch bookings by email from Firestore' };
        }
    }
   
    async getBookingByNumberPlate(numberPlate) {
        try {
            const querySnapshot = await db.collection('bookings').where('numberPlate', '==', numberPlate).get();
            if (querySnapshot.empty) {
                throw new Error(`No bookings found for number plate ${numberPlate}.`);
            }
            const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return bookings; 
        } catch (error) {
            console.error('Error fetching booking by number plate:', error);
            throw new Error('Could not fetch bookings by number plate from Firestore');
        }
    }

    // Service method for fetching all bookings
    async getAllBookings() {
        try {
            const querySnapshot = await db.collection('bookings').get();


            // Check if any bookings exist
            if (querySnapshot.empty) {
                console.log('No bookings found');
                return [];  // Return empty array if no bookings found
            }

            // Map Firestore documents to a list of bookings with transformed data
            const bookings = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    bookingDate: data.bookingDate ? data.bookingDate : null,
                    returnDate: data.returnDate ? data.returnDate : null,
                    acceptTime: data.acceptTime ? data.acceptTime : null,
                };
            });

            return bookings;
        } catch (error) {
            console.error('Error fetching all bookings from Firestore:', error);
            throw new Error('Could not fetch all bookings from Firestore');
        }
    }

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
    
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}.`);
            }
    
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
    
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with id: ${id}`);
            }
    
            const currentTime = admin.firestore.Timestamp.now();
    
            await bookingRef.update({
                isAccept: true,
                acceptTime: currentTime
            });
    
            console.log(`Booking with id: ${id} has been accepted and time recorded.`);
            return { 
                message: `Booking with id: ${id} has been accepted.`,
                acceptTime: currentTime.toDate() // Convert Firestore timestamp to JS Date for response
            };
        } catch (error) {
            console.error('Error accepting booking:', error);
            throw new Error('Could not accept booking');
        }
    }
    
}

module.exports = new BookingMotoService();