const BookingMoto = require('../models/booking_moto');
const db = require('../firebase');
const admin = require('firebase-admin');

class BookingMotoService{ 
    async addBooking(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept, isHide, totalAmount) {
        try {
            // Convert bookingDate and returnDate to Firestore Timestamps if necessary
            if (!(bookingDate instanceof admin.firestore.Timestamp)) {
                bookingDate = admin.firestore.Timestamp.fromDate(new Date(bookingDate));
            }
            if (!(returnDate instanceof admin.firestore.Timestamp)) {
                returnDate = admin.firestore.Timestamp.fromDate(new Date(returnDate));
            }
    
            // Fetch conflicting bookings for the same numberPlate
            const conflictingBookingsSnapshot = await db.collection('bookings')
                .where('numberPlate', '==', numberPlate)
                .where('isAccept', '==', true)  // Consider only accepted bookings
                .get();
    
            for (const conflictDoc of conflictingBookingsSnapshot.docs) {
                const conflictData = conflictDoc.data();
    
                // Convert Firestore Timestamps to Date objects
                let conflictBookingDate = conflictData.bookingDate.toDate();
                let conflictReturnDate = conflictData.returnDate.toDate();
    
                // Check for conflicts
                if (
                    (bookingDate.toDate() >= conflictBookingDate && bookingDate.toDate() <= conflictReturnDate) || // New booking starts during an existing booking
                    (returnDate.toDate() >= conflictBookingDate && returnDate.toDate() <= conflictReturnDate) ||   // New booking ends during an existing booking
                    (bookingDate.toDate() <= conflictBookingDate && returnDate.toDate() >= conflictReturnDate)     // New booking completely overlaps an existing booking
                ) {
                    console.log('Conflict detected: Vehicle is already booked.');
                    return { message: 'Conflict detected: Vehicle is already booked.' };
                }
            }
    
            // No conflict, proceed with adding the booking
            const motorbikeRentalDeposit = totalAmount * 0.1; // Calculate deposit
    
            const newBooking = {
                email,
                numberPlate,
                bookingDate,
                returnDate,
                numberOfRentalDay,
                isAccept,
                isHide,
                totalAmount,
                motorbikeRentalDeposit,
            };
    
            const docRef = await db.collection('bookings').add(newBooking);
    
            console.log('Booking added successfully with ID:', docRef.id);
            return { id: docRef.id, ...newBooking };
    
        } catch (error) {
            console.error('Error checking and adding booking:', error);
            throw new Error('Could not check and add booking');
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
                throw new Error('Booking ID is required to accept a booking.');
            }
    
            const bookingRef = db.collection('bookings').doc(id);
            const doc = await bookingRef.get();
    
            if (!doc.exists) {
                throw new Error(`No booking found with ID: ${id}`);
            }
    
            const bookingData = doc.data();
            let { numberPlate, bookingDate, returnDate } = bookingData;
    
            // Chuyển đổi bookingDate và returnDate thành đối tượng Date nếu chúng là Firestore Timestamps
            if (bookingDate instanceof admin.firestore.Timestamp) {
                bookingDate = bookingDate.toDate();
            } else {
                bookingDate = new Date(bookingDate); // Nếu là chuỗi, chuyển đổi thành đối tượng Date
            }
    
            if (returnDate instanceof admin.firestore.Timestamp) {
                returnDate = returnDate.toDate();
            } else {
                returnDate = new Date(returnDate); // Nếu là chuỗi, chuyển đổi thành đối tượng Date
            }
    
            // Lấy các booking đã được chấp nhận và không bị ẩn với cùng numberPlate
            const conflictingBookingsSnapshot = await db.collection('bookings')
                .where('numberPlate', '==', numberPlate)
                .where('isAccept', '==', true)  // Chỉ xét các booking đã chấp nhận
                .get();
    
            // Kiểm tra xung đột với tất cả booking đã chấp nhận
            for (const conflictDoc of conflictingBookingsSnapshot.docs) {
                const conflictData = conflictDoc.data();
                let conflictBookingDate = conflictData.bookingDate.toDate();
                let conflictReturnDate = conflictData.returnDate.toDate();
    
                // Kiểm tra xung đột: 3 trường hợp booking mới xung đột với booking cũ
                if (
                    (bookingDate >= conflictBookingDate && bookingDate <= conflictReturnDate) ||  // Booking mới bắt đầu trong thời gian booking cũ
                    (returnDate >= conflictBookingDate && returnDate <= conflictReturnDate) ||    // Booking mới kết thúc trong thời gian booking cũ
                    (bookingDate <= conflictBookingDate && returnDate >= conflictReturnDate)    // Booking mới hoàn toàn chồng lên booking cũ
                ) {
                    // In thông báo đơn giản thay vì ném lỗi chi tiết
                    console.log('Xe đã được thuê');
                    return { message: 'Conflict detected: Vehicle is already booked.' };  // Trả về thông báo "Xe đang được thuê"
                }
            }
    
            // Cập nhật booking với trạng thái "isAccept" = true
            const currentTime = admin.firestore.Timestamp.now();
            await bookingRef.update({ isAccept: true, acceptTime: currentTime });
    
            console.log(`Booking with ID: ${id} has been accepted and time recorded.`);
            return { message: 'Booking accepted successfully', acceptTime: currentTime.toDate() };  // Chuyển đổi Firestore timestamp sang JS Date để trả về
        } catch (error) {
            // In thông báo lỗi đơn giản thay vì chi tiết lỗi
            console.error('Error accepting booking:', error);
            return { message: 'Conflict detected: Vehicle is already booked.' };  // Trả về thông báo lỗi đơn giản
        }
    } 
    
    async getFutureBookings(numberPlate) {
        try {
            // Get the current date to compare with the returnDate of bookings
            const currentDate = new Date();
    
            // Query for bookings that are accepted, have a returnDate greater than the current date, and match the provided numberPlate
            const querySnapshot = await db.collection('bookings')
                .where('isAccept', '==', true)  // Only accepted bookings
                // .where('isHide', '==', false)   // Only visible bookings
                .where('numberPlate', '==', numberPlate)  // Filter by numberPlate
                .get();
    
            // Check if there are no bookings found
            if (querySnapshot.empty) {
                console.log('No accepted bookings found for this number plate.');
                return { bookings: [] };  // Return empty array if no bookings found
            }
    
            // Filter and map the bookings where returnDate is greater than current date
            const futureBookings = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const bookingDate = data.bookingDate ? data.bookingDate.toDate() : null;
                const returnDate = data.returnDate ? data.returnDate.toDate() : null;
    
                // Check if returnDate is greater than the current date
                if (returnDate && returnDate > currentDate) {
                    return {
                        id: doc.id,
                        bookingDate,
                        returnDate,
                    };
                }
                return null;  // Ignore bookings where returnDate <= current date
            }).filter(Boolean);  // Remove null entries from the array
    
            return { bookings: futureBookings };
        } catch (error) {
            console.error('Error fetching future bookings:', error);
            return { error: 'Could not fetch future bookings' };
        }
    }    

}

module.exports = new BookingMotoService();