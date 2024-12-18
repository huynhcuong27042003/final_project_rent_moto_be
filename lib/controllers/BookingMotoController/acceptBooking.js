const BookingMotoService = require('../../services/bookingMotoService');

exports.acceptBooking = async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await BookingMotoService.acceptBooking(id);

        res.status(200).json({
            message: result.message,
            acceptTime: result.acceptTime 
        });

    } catch (error) {
        console.error('Error accepting booking:', error.message);
        res.status(500).json({
            error: error.message || 'Could not accept booking'
        });
    }
};
