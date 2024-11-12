// controllers/BookingMotoController/acceptBooking.js
const BookingMotoService = require('../../services/bookingMotoService');

exports.acceptBooking = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    try {
        const result = await BookingMotoService.acceptBooking(id); // Gọi service để cập nhật booking
        res.status(200).json(result); // Trả về thông báo thành công
    } catch (error) {
        console.error('Error accepting booking:', error.message);
        res.status(500).json({ error: error.message || 'Could not accept booking' }); // Trả về lỗi nếu có
    }
};