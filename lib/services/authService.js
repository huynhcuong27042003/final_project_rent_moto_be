const auth = require('../firebaseAuth');
class AuthService {
    async addUser(email, password) {
        // Kiểm tra tính hợp lệ của đầu vào
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new TypeError('Email and password must be strings.');
        }

        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await auth.getUserByEmail(email);
            if (existingUser) {
                throw new Error('Account already exists with this email.');
            }
        } catch (error) {
            // Nếu lỗi không phải là 'User not found', thì đó là lỗi khác
            if (error.code !== 'auth/user-not-found') {
                console.error('Error checking user:', error);
                throw new Error('Error checking if user exists: ' + error.message);
            }
        }

        try {
            // Tạo người dùng mới với email và mật khẩu
            const userRecord = await auth.createUser({
                email: email,
                password: password,
            });
            console.log('User added:', userRecord.uid); // In ID người dùng
            return userRecord; // Trả về đối tượng người dùng
        } catch (error) {
            console.error('Error adding user:', error);
            throw new Error('Could not add user: ' + error.message); // Trả về thông báo lỗi
        }
    }

    async login(email, password) {
        // Kiểm tra tính hợp lệ của đầu vào
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new TypeError('Email and password must be strings.');
        }

        try {
            // Đăng nhập người dùng bằng Firebase Authentication
            const userRecord = await auth.getUserByEmail(email);
            // Bạn có thể thêm kiểm tra mật khẩu ở đây (nếu cần)

            // Nếu đăng nhập thành công, trả về thông tin người dùng
            return userRecord;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw new Error('Login failed: ' + error.message);
        }
    }
}

// Xuất AuthService
module.exports = new AuthService();