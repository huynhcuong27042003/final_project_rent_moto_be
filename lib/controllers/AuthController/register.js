const authService = require('../../services/authService'); // Import AuthService
const appUserService = require('../../services/appUserService'); // Import AppUserService
const Roles = require('../../models/roles'); // Import Roles
const Information = require('../../models/information'); // Import Information class

exports.register = async(req, res) => {
    try {
        const {
            email,
            password,
            phoneNumber = null,
            role = "user", // Có thể là null // Gán giá trị mặc định cho role
            address = null, // Có thể là null
            information = {}, // Có thể là một đối tượng rỗng
            isActive = true, // Gán giá trị mặc định cho isActive
            isHide = false // Gán giá trị mặc định cho isHide
        } = req.body;

        // Thêm người dùng vào Firebase Authentication
        const user =  authService.addUser(email, password);
        // Gán giá trị mặc định "No information" cho các tham số nếu chúng là null
        const userPhoneNumber = phoneNumber || "No information";
        const userAddress = address || { detail: "No information" }; // Gán mặc định cho address
        const userInfo = new Information(
            information.name || "No information", // Gán mặc định cho information.name
            information.dayOfBirth || "No information", // Gán mặc định cho dayOfBirth
            information.avatar || "No information", // Gán mặc định cho avatar
            information.gplx || "No information" // Gán mặc định cho gplx
        );

        // Thêm người dùng vào Firestore Database
        const newUser = await appUserService.addUser(
            email,
            userPhoneNumber,
            role,
            userAddress,
            userInfo,
            isActive,
            isHide
        );

        // Trả về phản hồi thành công
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Registration failed',
            error: error.message,
        });
    }
}
