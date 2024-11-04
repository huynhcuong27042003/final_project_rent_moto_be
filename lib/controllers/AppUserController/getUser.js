const AppUserService = require('../../services/appUserService'); // Điều chỉnh đường dẫn nếu cần thiết

// Lấy người dùng theo ID hoặc tất cả người dùng nếu không có ID được cung cấp
exports.getUser = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số đường dẫn

    try {
        if (id) {
            // Nếu ID được cung cấp, lấy người dùng cụ thể
            const user = await AppUserService.getUser(id);
            return res.status(200).json(user);
        } else {
            // Nếu không có ID được cung cấp, lấy tất cả người dùng
            const users = await AppUserService.getAllUsers();
            return res.status(200).json(users);
        }
    } catch (error) {
        console.error('Error retrieving user(s):', error);
        res.status(404).json({ error: error.message }); // Trả về mã lỗi 404 nếu không tìm thấy
    }
};
