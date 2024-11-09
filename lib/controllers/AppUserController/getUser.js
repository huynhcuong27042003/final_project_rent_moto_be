const AppUserService = require('../../services/appUserService'); // Điều chỉnh đường dẫn nếu cần thiết

// Lấy người dùng theo email hoặc tất cả người dùng nếu không có email được cung cấp
exports.getUser = async (req, res) => {
    const { email } = req.params; // Lấy email từ tham số URL
    try {
        let user;
        if (email) {
            // Nếu có email, tìm kiếm người dùng theo email
            user = await AppUserService.getUserByEmail(email);
            return res.status(200).json(user); // Trả về người dùng
        } else {
            // Nếu không có email, trả về tất cả người dùng
            const allUsers = await AppUserService.getAllUsers();
            return res.status(200).json(allUsers); // Trả về danh sách tất cả người dùng
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching user(s)' });
    }
};