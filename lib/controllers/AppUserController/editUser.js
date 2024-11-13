const AppUserService = require('../../services/appUserService'); // Điều chỉnh đường dẫn nếu cần

exports.editUser = async (req, res) => {
    const { email } = req.params; // Lấy email từ tham số URL
    const updatedFields = req.body; // Lấy các trường cần cập nhật từ body request

    try {
        // Cập nhật người dùng thông qua service updateUser
        const updatedUserData = await AppUserService.updateUser(email, updatedFields);
        
        // Trả về người dùng đã được cập nhật
        res.status(200).json(updatedUserData); 
    } catch (error) {
        console.error('Error updating user:', error);

        // Kiểm tra lỗi nếu người dùng không tìm thấy
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }

        // Trả về lỗi 500 nếu gặp sự cố trong quá trình cập nhật
        return res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};
