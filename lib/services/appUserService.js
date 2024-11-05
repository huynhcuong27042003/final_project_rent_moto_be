const AppUser = require('../models/appUser'); // Importing the AppUser class
const Roles = require('../models/roles'); // Importing Roles
const Information = require('../models/information'); // Importing Information class
const db = require('../firebase'); // Ensure Firebase is configured

class AppUserService {
    constructor() {
        this.users = []; // Array to hold AppUser instances (if needed)
    }

    async addUser(email, phoneNumber, role, address, information, isActive = true, isHide = false) {
        // Validate inputs
        if (typeof email !== 'string' || email.trim() === '') {
            throw new TypeError('Email must be a non-empty string.');
        }
        if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
            throw new TypeError('Phone number must be a non-empty string.');
        }
        if (!Object.values(Roles).includes(role)) {
            throw new TypeError('Role must be one of the predefined Roles.');
        }
        if (typeof address !== 'object' || address === null) {
            throw new TypeError('Address must be a non-null object.');
        }
        if (!(information instanceof Information)) {
            throw new TypeError('Information must be an instance of Information.');
        }
        if (typeof isActive !== 'boolean') {
            throw new TypeError('isActive must be a boolean.');
        }
        if (typeof isHide !== 'boolean') {
            throw new TypeError('isHide must be a boolean.');
        }
    
        try {
            // Kiểm tra xem email đã tồn tại trong Firestore chưa
            const existingUserQuery = await db.collection('users').where('email', '==', email).get();
            if (!existingUserQuery.empty) {
                throw new Error('Email already exists.');
            }
    
            // Tạo một đối tượng AppUser mới
            const newUser = new AppUser(email, phoneNumber, role, address, information, isHide, isActive);
    
            // Lưu người dùng vào Firestore
            const docRef = await db.collection('users').add(newUser.toObject());
            console.log('User added with ID:', docRef.id);
            
            return { id: docRef.id, ...newUser.toObject() };
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
            throw new Error(error.message || 'Could not add user to Firestore');
        }
    }
    

    async updateUser(id, updatedFields) {
        // Retrieve current user data
        const userData = await this.getUser(id);
        
        // Create document reference
        const docRef = db.collection('users').doc(userData.id);
        
        // Create new instance of Information if needed
        const information = updatedFields.information 
            ? new Information(
                updatedFields.information.name || userData.information.name,
                updatedFields.information.dayOfBirth || userData.information.dayOfBirth,
                updatedFields.information.avatar || userData.information.avatar,
                updatedFields.information.gplx || userData.information.gplx
            ) 
            : userData.information;
    
        // Prepare the updated user object
        const updatedUser = new AppUser(
            updatedFields.email || userData.email,
            updatedFields.name || userData.name,
            updatedFields.phoneNumber || userData.phoneNumber,
            updatedFields.role || userData.role,
            updatedFields.address || userData.address,
            information, // Use the updated Information instance
            updatedFields.isHide !== undefined ? updatedFields.isHide : userData.isHide
        );
    
        try {
            // Update the user document in Firestore
            await docRef.update(updatedUser.toObject());
            return { id: userData.id, ...updatedUser.toObject() };
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user in Firestore');
        }
    }
}    

// module.exports = AppUserService;
module.exports = new AppUserService();
