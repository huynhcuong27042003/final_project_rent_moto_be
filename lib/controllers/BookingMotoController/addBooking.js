const BookingMotoService = require('../../services/bookingMotoService');
const db = require('../../firebase');

exports.addBooking = async (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { email, numberPlate, bookingDate, returnDate, numberOfRentalDay, isAccept = false, isHide = false } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !numberPlate || !bookingDate || !returnDate || !Number.isInteger(numberOfRentalDay)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Chuyển đổi ngày tháng
        const bookingDateObj = new Date(bookingDate);
        const returnDateObj = new Date(returnDate);

        if (isNaN(bookingDateObj.getTime()) || isNaN(returnDateObj.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Gọi service để thêm booking mới
        const newBooking = await BookingMotoService.addBooking(email, numberPlate, bookingDateObj, returnDateObj, numberOfRentalDay, isAccept, isHide);

        // Trả về phản hồi thành công
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: error.message });
    }
};

