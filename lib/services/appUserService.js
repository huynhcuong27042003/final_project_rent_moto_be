const AppUser = require('../models/appUser'); // Importing the AppUser class
const Roles = require('../models/roles'); // Importing Roles
const Information = require('../models/information'); // Importing Information class
const db = require('../firebase'); // Ensure Firebase is configured

class AppUserService {
    constructor() {
        this.users = []; // Array to hold AppUser instances (if needed)
    }

    async addUser(email, name, phoneNumber, role, address, information, isActive = true, isHide = false) {
        // Validate inputs
        if (typeof email !== 'string' || typeof name !== 'string' || typeof phoneNumber !== 'string') {
            throw new TypeError('Email, name, and phoneNumber must be strings.');
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

        // Create a new AppUser instance
        const newUser = new AppUser(email, name, phoneNumber, role, address, information, isHide);

        try {
            // Save the user to Firestore
            const docRef = await db.collection('users').add(newUser.toObject());
            console.log('User added with ID:', docRef.id);
            return { id: docRef.id, ...newUser.toObject() };
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
            throw new Error('Could not add user to Firestore');
        }
    }

    async getUser(id) {
        const doc = await db.collection('users').doc(id).get(); // Fetch user by ID
        if (!doc.exists) {
            throw new Error(`User with ID ${id} not found.`);
        }
        return { id: doc.id, ...doc.data() }; // Return the found user data
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
