const BookingMotoService = require('../../services/bookingMotoService');

exports.acceptBooking = async (req, res) => {
    const { id } = req.params; // Get the booking ID from URL parameters
    try {
        // Call the service method to accept the booking
        const result = await BookingMotoService.acceptBooking(id);

        // Return a success response with the result from the service
        res.status(200).json({
            message: result.message,   // Message from service indicating success
            acceptTime: result.acceptTime // Return the acceptTime from the service
        });

    } catch (error) {
        console.error('Error accepting booking:', error.message);
        // Return an error response with the message from the service
        res.status(500).json({
            error: error.message || 'Could not accept booking' // Handle potential error message
        });
    }
};
