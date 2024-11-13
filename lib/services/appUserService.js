const AppUser = require('../models/appUser'); // Importing the AppUser class
const Roles = require('../models/roles'); // Importing Roles
const Information = require('../models/information'); // Importing Information class
const db = require('../firebase'); // Ensure Firebase is configured

class AppUserService {
    constructor() {
        this.users = []; // Array to hold AppUser instances (if needed)
    }

    async addUser(email, phoneNumber, role, information, isActive = true, isHide = false) {
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
            const newUser = new AppUser(email, phoneNumber, role, information, isHide, isActive);
    
            // Lưu người dùng vào Firestore
            const docRef = await db.collection('users').add(newUser.toObject());
            console.log('User added with ID:', docRef.id);
            
            return { id: docRef.id, ...newUser.toObject() };
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
            throw new Error(error.message || 'Could not add user to Firestore');
        }
    }

    async getUserByEmail(email) {
        // Truy vấn người dùng từ Firestore theo email
        const querySnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
        if (querySnapshot.empty) {
            throw new Error(`User with email ${email} not found.`);
        }
        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() }; // Trả về dữ liệu của người dùng
    }

    async getAllUsers() {
        try {
            const querySnapshot = await db.collection('users').get(); // Fetch all users
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return users; // Return array of all users
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Could not fetch users from Firestore');
        }
    }

    async updateUser(email, updates) {
        // Lấy dữ liệu người dùng hiện tại từ Firestore theo email
        const userData = await this.getUserByEmail(email);
        
        if (!userData) {
            throw new Error(`User with email ${email} not found.`);
        }
    
        // Tạo bản sao dữ liệu hiện tại của người dùng
        const currentData = { ...userData };
    
        // Xử lý riêng phần 'information' để chỉ cập nhật các trường cụ thể
        if (updates.information) {
            currentData.information = {
                ...currentData.information, // Giữ lại các giá trị cũ
                ...updates.information      // Gộp các giá trị cập nhật vào
            };
        }
    
        // Duyệt qua từng trường trong `updates` để chỉ cập nhật các giá trị không thuộc 'information'
        Object.keys(updates).forEach((key) => {
            if (key !== 'information') {
                currentData[key] = updates[key];
            }
        });
    
        try {
            const docRef = db.collection('users').doc(userData.id);
            await docRef.update(currentData);
            console.log(`User with email ${email} updated successfully in Firestore`);
    
            return { id: userData.id, ...currentData };
    
        } catch (error) {
            console.error('Error updating user in Firestore:', error);
            throw new Error('Failed to update user in Firestore');
        }
    }
    
}    

module.exports = new AppUserService();

