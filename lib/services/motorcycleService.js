const Motorcycle = require('../models/motorCycle');
const CompanyMoto = require('../models/companyMoto'); // Nhập lớp CompanyMoto
const CategoryMoto = require('../models/categoryMoto'); // Nhập lớp CategoryMoto
const InformationMoto = require('../models/informationMoto');
const db = require('../firebase'); // Đảm bảo rằng bạn đã cấu hình Firebase

class MotorcycleService {
    constructor() {
        this.motorcycles = []; // Array to hold motorcycle instances
    }
    
    async addMotorcycle(numberPlate, companyMotoName, categoryName, informationMoto, isActive = false, isHide = false,email) {
        // Validate companyMotoName and categoryName as strings
        if (typeof companyMotoName !== 'string' || typeof categoryName !== 'string') {
            throw new TypeError('companyMoto and category should be strings (names).');
        }

        if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            throw new TypeError('email must be a valid email address.');
        }

        // Create CompanyMoto and CategoryMoto instances with only the name
        const companyMoto = new CompanyMoto(companyMotoName); // Only passing the name
        const category = new CategoryMoto(categoryName); // Only passing the name

        // Create a new Motorcycle instance
        const newMotorcycle = new Motorcycle(numberPlate, companyMoto, category, informationMoto, isActive, isHide,email);

        try {
            // Save the motorcycle to Firestore
            const docRef = await db.collection('motorcycles').add(newMotorcycle.toObject());
            console.log('Motorcycle added with ID:', docRef.id);
            return { id: docRef.id, ...newMotorcycle.toObject() };
        } catch (error) {
            console.error('Error adding motorcycle to Firestore:', error);
            throw new Error('Could not add motorcycle to Firestore');
        }
    }

    async getMotorcycle(id) {
        const doc = await db.collection('motorcycles').doc(id).get(); // Fetch motorcycle by ID
        if (!doc.exists) {
            throw new Error(`Motorcycle with ID ${id} not found.`);
        }
        return { id: doc.id, ...doc.data() }; // Return the found motorcycle data
    }

    async getAllMotorcycles() {
        try {
            const querySnapshot = await db.collection('motorcycles')
            .where('isHide', '==', true)  // Only return motorcycles where isHide is false
            .get(); // Fetch all motorcycles
            const motorcycles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return motorcycles; // Return array of all motorcycles
        } catch (error) {
            console.error('Error fetching all motorcycles:', error);
            throw new Error('Could not fetch motorcycles from Firestore');
        }
    }

    async getAllMotorcyclesIsAccept() {
        try {
            const querySnapshot = await db.collection('motorcycles')
                .where('isHide', '==', false)  // Only return motorcycles where isHide is false
                .get();
    
            const motorcycles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return motorcycles;
        } catch (error) {
            console.error('Error fetching motorcycles:', error);
            throw new Error('Could not fetch motorcycles');
        }
    }

    // Update motorcycle method
    async updateMotorcycle(id, updates) {
        try {
            const docRef = db.collection('motorcycles').doc(id);
            const doc = await docRef.get(); // Fetch the existing motorcycle document

            if (!doc.exists) {
                throw new Error(`Motorcycle with ID ${id} not found.`);
            }

            // Fetch the current data from the document
            const currentData = doc.data();

            // Prepare the updated data by merging current data with the provided updates
            const updatedData = { ...currentData, ...updates };

            // Update only the fields that are included in 'updates'
            // We need to make sure to properly handle nested objects like 'informationMoto'
            if (updates.informationMoto) {
                updatedData.informationMoto = { ...currentData.informationMoto, ...updates.informationMoto };
            }

            // Save the updated data back to Firestore
            await docRef.update(updatedData);
            console.log(`Motorcycle with ID ${id} updated successfully`);

            // Return the updated motorcycle data
            return { id, ...updatedData };

        } catch (error) {
            console.error('Error updating motorcycle:', error);
            throw new Error('Could not update motorcycle in Firestore');
        }
    }

}

module.exports = MotorcycleService; 
