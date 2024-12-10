const BookingMotoService = require('../../services/bookingMotoService');

exports.getBookingByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        console.log('Fetching bookings for email:', email); // Log received email
        const bookingsResponse = await BookingMotoService.getBookingByEmail(email);
        
        // Check if the response contains an error
        if (bookingsResponse.error) {
            return res.status(404).json({
                error: bookingsResponse.error, // Return the error message from the service
            });
        }

        // Transform Firestore timestamps to ISO strings
        const bookings = bookingsResponse.bookings.map(booking => ({
            ...booking,
            bookingDate: new Date(booking.bookingDate._seconds * 1000).toISOString(),
            returnDate: new Date(booking.returnDate._seconds * 1000).toISOString(),
            acceptTime: new Date(booking.acceptTime._seconds * 1000).toISOString(), // Convert acceptTime
        }));

        // Return the transformed bookings
        res.status(200).json({ bookings });

    } catch (error) {
        console.error('Error fetching bookings by email:', error);
        res.status(500).json({
            error: 'Lỗi khi lấy danh sách booking từ Firestore, vui lòng thử lại sau.',
        });
    }
};

