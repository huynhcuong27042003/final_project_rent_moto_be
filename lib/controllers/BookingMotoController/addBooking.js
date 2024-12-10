const moment = require('moment-timezone');
const BookingMotoService = require('../../services/bookingMotoService');

exports.addBooking = async (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { email, numberPlate, bookingDate, returnDate, numberOfRentalDay, totalAmount, isAccept = false, isHide = false } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !numberPlate || !bookingDate || !returnDate || !Number.isInteger(numberOfRentalDay)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Xác định múi giờ cho Việt Nam (UTC+7)
        const vietnamTimezone = 'Asia/Ho_Chi_Minh';

        // Convert the bookingDate and returnDate to Vietnam time (UTC+7)
        const bookingDateObj = moment.tz(bookingDate, vietnamTimezone).toDate(); // Convert to Vietnam time (UTC+7)
        const returnDateObj = moment.tz(returnDate, vietnamTimezone).toDate(); // Convert to Vietnam time (UTC+7)

        // Kiểm tra xem các ngày có hợp lệ không
        if (isNaN(bookingDateObj.getTime()) || isNaN(returnDateObj.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Now we need to convert these dates to UTC before saving to Firestore
        const bookingDateUTC = moment(bookingDateObj).utc().toDate();
        const returnDateUTC = moment(returnDateObj).utc().toDate();

        // Gọi service để thêm booking mới
        const newBooking = await BookingMotoService.addBooking(
            email,
            numberPlate,
            bookingDateUTC,
            returnDateUTC,
            numberOfRentalDay,
            isAccept,
            isHide,
            totalAmount
        );

        // Trả về phản hồi thành công
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: error.message });
    }
};










