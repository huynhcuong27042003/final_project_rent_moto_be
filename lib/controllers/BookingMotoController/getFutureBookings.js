const BookingMotoService = require('../../services/bookingMotoService');

exports.getFutureBookings = async (req, res) => {
    try {
        // Lấy numberPlate từ tham số đường dẫn (URL) hoặc từ query string
        const numberPlate = req.params.numberPlate || req.query.numberPlate;
        
        // Kiểm tra xem numberPlate có tồn tại không
        if (!numberPlate) {
            return res.status(400).json({ error: 'Number plate is required' });
        }

        // Gọi hàm getFutureBookings từ service để lấy danh sách booking tương lai
        const result = await BookingMotoService.getFutureBookings(numberPlate);

        // Kiểm tra xem có kết quả trả về hay không
        if (result.error) {
            return res.status(500).json({ error: result.error });
        }

        // Trả kết quả về client (danh sách booking tương lai)
        return res.status(200).json({ bookings: result.bookings });
    } catch (error) {
        console.error('Error in getFutureBookings controller:', error);
        return res.status(500).json({ error: 'An error occurred while fetching future bookings' });
    }
};
