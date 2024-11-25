// module.exports = MotorcycleService; 
const Motorcycle = require('../models/motorCycle');
const CompanyMoto = require('../models/companyMoto'); // Import CompanyMoto class
const CategoryMoto = require('../models/categoryMoto'); // Import CategoryMoto class
const InformationMoto = require('../models/informationMoto');
const Address = require('../models/address'); // Import Address class
const db = require('../firebase'); // Ensure Firebase is configured

class MotorcycleService {
    constructor() {
        this.motorcycles = []; // Array to hold motorcycle instances
    }
    
    async addMotorcycle(numberPlate, companyMotoName, categoryName, informationMoto, isActive = false, isHide = false, email, address = null) {
        // Validate companyMotoName, categoryName, and email as strings
        if (typeof companyMotoName !== 'string' || typeof categoryName !== 'string') {
            throw new TypeError('companyMoto and category should be strings (names).');
        }
    
        if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            throw new TypeError('email must be a valid email address.');
        }
    
        // Validate address (if provided) to be an instance of Address
        if (address && !(address instanceof Address)) {
            throw new TypeError('address must be an instance of Address.');
        }
    
        // Create CompanyMoto and CategoryMoto instances with only the name
        const companyMoto = new CompanyMoto(companyMotoName); // Only passing the name
        const category = new CategoryMoto(categoryName); // Only passing the name
    
        // Create a new Motorcycle instance with address
        const newMotorcycle = new Motorcycle(numberPlate, companyMoto, category, informationMoto, isActive, isHide, email, address);
    
        try {
            // Save the motorcycle to Firestore
            const docRef = await db.collection('motorcycles').add(newMotorcycle.toObject());
            console.log('Motorcycle added with ID:', docRef.id);
    
            // Now, update the AppUser's motorcycleList based on email
            const appUserRef = db.collection('users'); // Reference to the 'users' collection
            const snapshot = await appUserRef.where('email', '==', email).get(); // Query by email
    
            if (snapshot.empty) {
                throw new Error(`User with email ${email} not found.`);
            }
    
            const appUserDoc = snapshot.docs[0]; // Assuming there's only one user per email
            const appUserData = appUserDoc.data();
            
            // Update motorcycleList by appending the new motorcycle's ID
            const updatedMotorcycleList = [...(appUserData.motorcycleList || []), docRef.id];
            
            await appUserDoc.ref.update({
                motorcycleList: updatedMotorcycleList
            });
            console.log('User motorcycleList updated successfully.');
    
            // Return the new motorcycle data with ID included
            return { id: docRef.id, ...newMotorcycle.toObject() };
        } catch (error) {
            console.error('Error adding motorcycle or updating user motorcycleList:', error.message);
            throw new Error('Could not add motorcycle and update user motorcycleList');
        }
    }
    
    
    async getMotorcycle(id) {
        const doc = await db.collection('motorcycles').doc(id).get(); // Fetch motorcycle by ID
        if (!doc.exists) {
            throw new Error(`Motorcycle with ID ${id} not found.`);
        }
        return { id: doc.id, ...doc.data() }; // Return the found motorcycle data
    }

    async getAllMotorcyclesByAdmin() {
        try {
            // Fetch all motorcycles without filtering by 'isHide'
            const querySnapshot = await db.collection('motorcycles').get();
    
            // Map over the documents to retrieve their data
            const motorcycles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            return motorcycles; // Return all motorcycles
        } catch (error) {
            console.error('Error fetching all motorcycles:', error);
            throw new Error('Could not fetch motorcycles from Firestore');
        }
    }    

    async getAllMotorcycles() {
        try {
            const querySnapshot = await db.collection('motorcycles')
                .where('isHide', '==', true)  // Only return motorcycles where isHide is false
                .get();
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

            // Handle nested objects: Update only the fields that are included in 'updates'
            if (updates.informationMoto) {
                updatedData.informationMoto = { ...currentData.informationMoto, ...updates.informationMoto };
            }
            if (updates.address) {
                updatedData.address = { ...currentData.address, ...updates.address };
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

    static async getMotorcycleListByUser(userId) {
        try {
          // Fetch the user document directly by userId
          const userDoc = await db.collection('users').doc(userId).get();
      
          if (!userDoc.exists) {
            throw new Error('User not found.');
          }
      
          const motorcycleList = userDoc.data().motorcycleList || [];
      
          // Fetch detailed motorcycle information for each motorcycle ID in the motorcycle list
          const motorcycleDetails = await Promise.all(
            motorcycleList.map(async motorcycleId => {
              const motorcycleSnapshot = await db.collection('motorcycles').doc(motorcycleId).get();
              if (motorcycleSnapshot.exists) {
                return { id: motorcycleId, ...motorcycleSnapshot.data() }; // Combine ID and motorcycle details
              } else {
                return { id: motorcycleId, error: 'Motorcycle not found' }; // Handle missing motorcycle
              }
            })
          );
      
          // Return the detailed list of motorcycles
          return motorcycleDetails;
        } catch (error) {
          throw new Error(`Failed to retrieve motorcycle list: ${error.message}`);
        }
    }
      
}

module.exports = MotorcycleService;

