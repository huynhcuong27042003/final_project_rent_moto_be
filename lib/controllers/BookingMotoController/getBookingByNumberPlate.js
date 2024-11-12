const BookingMotoService = require('../../services/bookingMotoService');
exports.getBookingByNumberPlate = async(req, res) => {
    const{numberPlate} = req.params;
    try {
        const bookings = await BookingMotoService.getBookingByNumberPlate(numberPlate);
        
        if (!bookings.length) {
            return res.status(404).json({ error: `No bookings found for number plate ${numberPlate}.` });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings by number plate:', error);
        res.status(500).json({ error: 'Could not fetch bookings by number plate' });
    }
}