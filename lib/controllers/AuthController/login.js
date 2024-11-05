const authService = require('../../services/authService');
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Lấy email và password từ yêu cầu

        // Kiểm tra xem email và password có được cung cấp không
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        // Gọi phương thức đăng nhập trong AuthService
        const userRecord = await authService.login(email, password);

        // Nếu đăng nhập thành công, trả về thông tin người dùng
        res.status(200).json({
            message: 'Login successful',
            user: userRecord
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
};