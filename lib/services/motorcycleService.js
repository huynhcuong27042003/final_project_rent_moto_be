const Motorcycle = require('../models/motorCycle');
const CompanyMoto = require('../models/companyMoto'); // Nhập lớp CompanyMoto
const CategoryMoto = require('../models/categoryMoto'); // Nhập lớp CategoryMoto
const InformationMoto = require('../models/informationMoto');
const db = require('../firebase'); // Đảm bảo rằng bạn đã cấu hình Firebase

class MotorcycleService {
    constructor() {
        this.motorcycles = []; // Array to hold motorcycle instances
    }
    
    async addMotorcycle(numberPlate, companyMotoName, categoryName, informationMoto, isActive = false, isHide = false) {
        // Validate companyMotoName and categoryName as strings
        if (typeof companyMotoName !== 'string' || typeof categoryName !== 'string') {
            throw new TypeError('companyMoto and category should be strings (names).');
        }

        // Create CompanyMoto and CategoryMoto instances with only the name
        const companyMoto = new CompanyMoto(companyMotoName); // Only passing the name
        const category = new CategoryMoto(categoryName); // Only passing the name

        // Create a new Motorcycle instance
        const newMotorcycle = new Motorcycle(numberPlate, companyMoto, category, informationMoto, isActive, isHide);

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
            const querySnapshot = await db.collection('motorcycles').get(); // Fetch all motorcycles
            const motorcycles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return motorcycles; // Return array of all motorcycles
        } catch (error) {
            console.error('Error fetching all motorcycles:', error);
            throw new Error('Could not fetch motorcycles from Firestore');
        }
    }

    async updateMotorcycle(id, updatedFields) {
        const motorcycleData = await this.getMotorcycle(id);
        const docRef = db.collection('motorcycles').doc(motorcycleData.id);
    
        // Create new instances if fields are being updated
        const companyMoto = updatedFields.companyMoto 
            ? new CompanyMoto(updatedFields.companyMoto.name || motorcycleData.companyMoto.name) 
            : motorcycleData.companyMoto;
    
        const category = updatedFields.category 
            ? new CategoryMoto(updatedFields.category.name || motorcycleData.category.name) 
            : motorcycleData.category;
    
        // Create a new instance of InformationMoto if informationMoto is being updated
        const informationMoto = updatedFields.informationMoto 
            ? new InformationMoto(
                updatedFields.informationMoto.nameMoto || motorcycleData.informationMoto.nameMoto,
                updatedFields.informationMoto.price !== undefined ? updatedFields.informationMoto.price : motorcycleData.informationMoto.price,
                updatedFields.informationMoto.description || motorcycleData.informationMoto.description,
                updatedFields.informationMoto.energy || motorcycleData.informationMoto.energy,
                updatedFields.informationMoto.vehicleMass || motorcycleData.informationMoto.vehicleMass,
                updatedFields.informationMoto.imagesMoto || motorcycleData.informationMoto.imagesMoto
            )
            : motorcycleData.informationMoto;
    
        // Prepare the updated data object
        const updatedMoto = new Motorcycle(
            updatedFields.numberPlate || motorcycleData.numberPlate,
            companyMoto, // Use the instance of CompanyMoto
            category, // Use the instance of CategoryMoto
            informationMoto, // Use the instance of InformationMoto
            updatedFields.isActive !== undefined ? updatedFields.isActive : motorcycleData.isActive,
            updatedFields.isHide !== undefined ? updatedFields.isHide : motorcycleData.isHide
        );
    
        // Update the motorcycle document in Firestore
        await docRef.update(updatedMoto.toObject());
        return { id: motorcycleData.id, ...updatedMoto.toObject() };
    }
    
    
}

module.exports = MotorcycleService; 
