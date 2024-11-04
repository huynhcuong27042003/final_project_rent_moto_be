const Information = require('../../models/information');
const AppUserService = require('../../services/appUserService');
const db = require('../../firebase'); // Ensure Firebase is configured correctly

exports.addUser = async (req, res) => {
    try {
        // const { email, name, phoneNumber, role, address, information, isActive, isHide } = req.body;
        const { email, name, phoneNumber, role = "user", address, information, isActive, isHide = false } = req.body; // Default role to "user"

        // Validate input data
        if (!email || !name || !phoneNumber || !role || typeof address !== 'object') {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Check if the email already exists in Firestore
        const existingUserQuery = await db.collection('users').where('email', '==', email).get();
        if (!existingUserQuery.empty) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Convert information object to an instance of Information, then to a plain object for Firebase
        const infoInstance = new Information(
            information.name,
            information.dayOfBirth,
            information.avatar,
            information.gplx
        );

        // Pass the Information instance directly to addUser
        const newUser = await AppUserService.addUser(
            email,
            name,
            phoneNumber,
            role,
            address,
            infoInstance, // Use the instance here
            isActive,
            isHide
        );

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: error.message });
    }
};
