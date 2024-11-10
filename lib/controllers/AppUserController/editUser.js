const AppUserService = require('../../services/appUserService'); // Adjust the path if necessary
exports.editUser = async (req, res) => {
    const { email } = req.params; // Lấy email từ tham số URL
    const updatedFields = req.body; // Lấy các trường cần cập nhật từ body request
    try {
        // Lấy thông tin người dùng từ AppUserService theo email
        const updatedUser = await AppUserService.updateUser(email, updatedFields);
        res.status(200).json(updatedUser); // Trả về người dùng đã được cập nhật
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};