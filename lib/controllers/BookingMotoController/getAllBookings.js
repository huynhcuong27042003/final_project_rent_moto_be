const BookingMotoService = require('../../services/bookingMotoService'); // Import service

// Controller lấy tất cả các booking
exports.getAllBookings = async (req, res) => {
    try {
        // Fetch all bookings from the service
        const bookings = await BookingMotoService.getAllBookings();

        // Transform Firestore timestamps to ISO strings (if any timestamps exist)
        const transformedBookings = bookings.map(booking => ({
            ...booking,
            bookingDate: booking.bookingDate ? new Date(booking.bookingDate._seconds * 1000).toISOString() : null,
            returnDate: booking.returnDate ? new Date(booking.returnDate._seconds * 1000).toISOString() : null,
            acceptTime: booking.acceptTime ? new Date(booking.acceptTime._seconds * 1000).toISOString() : null,
        }));

        // Return the transformed bookings
        res.status(200).json({
            success: true,
            data: transformedBookings,
        });
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Could not fetch all bookings',
        });
    }
};