const BookingMotoService = require('../../services/bookingMotoService');

exports.getBookingById = async (req, res) => {
    try {
        // Lấy id từ tham số URL (req.params)
        const { id } = req.params;

        // Gọi hàm getBookingById từ BookingMotoService
        const booking = await BookingMotoService.getBookingById(id);

        // Nếu tìm thấy booking, trả về thông tin booking dưới dạng JSON
        return res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error fetching booking by id:', error);
        // Nếu có lỗi, trả về mã lỗi và thông báo
        return res.status(400).json({
            success: false,
            message: error.message || 'Could not fetch booking'
        });
    }
};
