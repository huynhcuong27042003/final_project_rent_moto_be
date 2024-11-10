const BookingMotoService = require('../../services/bookingMotoService');
const db = require('../../firebase');

exports.addBooking = async (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept = false } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !numberPlate || !bookingDate || !returnDate || !numberOfRentalDay) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Kiểm tra xem booking đã tồn tại chưa
        const existingBookingQuery = await db.collection('bookings')
            .where('email', '==', email)
            .where('numberPlate', '==', numberPlate)
            .get();
        if (!existingBookingQuery.empty) {
            return res.status(400).json({ error: 'Booking already exists for this email and number plate' });
        }

        // Gọi service để thêm booking mới
        const newBooking = await BookingMotoService.addBooking(email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept);

        // Trả về phản hồi thành công
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: error.message });
    }
};
