const BookingMotoService = require('../../services/bookingMotoService');

exports.getBookingById = async (req, res) => {
    try {
        // Lấy id từ tham số URL (req.params)
        const { id } = req.params;

        // Gọi hàm getBookingById từ BookingMotoService
        const booking = await BookingMotoService.getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Chuyển đổi `bookingDate` và `returnDate` nếu tồn tại
        if (booking.bookingDate && booking.bookingDate._seconds !== undefined) {
            booking.bookingDate = new Date(booking.bookingDate._seconds * 1000).toISOString();
        }

        if (booking.returnDate && booking.returnDate._seconds !== undefined) {
            booking.returnDate = new Date(booking.returnDate._seconds * 1000).toISOString();
        }

        // Trả về thông tin booking dưới dạng JSON
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

