const BookingMotoService = require('../../services/bookingMotoService');

exports.getBookingByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const bookings = await BookingMotoService.getBookingByEmail(email);
        
        if (!bookings.length) {
            return res.status(404).json({ error: `No bookings found for email ${email}.` });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings by email:', error);
        res.status(500).json({ error: 'Could not fetch bookings by email' });
    }
};
