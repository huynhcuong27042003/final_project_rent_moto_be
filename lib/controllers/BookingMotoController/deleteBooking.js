// controllers/BookingMotoController/deleteBooking.js
const BookingMotoService = require('../../services/bookingMotoService');

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await BookingMotoService.deleteBooking({ id }); // Gọi hàm deleteBooking với id
        res.status(200).json(result); // Trả về phản hồi thành công
    } catch (error) {
        console.error('Error deleting booking:', error.message);
        res.status(500).json({ error: error.message || 'Could not delete booking' }); // Xử lý lỗi
    }
};