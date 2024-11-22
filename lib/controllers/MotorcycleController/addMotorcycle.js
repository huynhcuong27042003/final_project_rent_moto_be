const MotorcycleService = require('../../services/motorcycleService');
const CompanyMoto = require('../../models/companyMoto'); 
const CategoryMoto = require('../../models/categoryMoto'); 
const InformationMoto = require('../../models/informationMoto');
const Address = require('../../models/address'); 
const db = require('../../firebase');
const motorcycleService = new MotorcycleService();

exports.addMotorcycle = async (req, res) => {
    try {
        const { numberPlate, companyMoto, category, informationMoto, isActive, isHide, email, address } = req.body;
        
        // Set default values for isActive and isHide
        const active = isActive !== undefined ? isActive : false; // Default to true if not provided
        const hide = isHide !== undefined ? isHide : false; 
        
        // Validate required fields
        if (!numberPlate || typeof numberPlate !== 'string') {
            return res.status(400).json({ error: 'numberPlate is required and should be a string' });
        }
        if (!companyMoto || !companyMoto.name || typeof companyMoto.name !== 'string') {
            return res.status(400).json({ error: 'companyMoto must have a valid name' });
        }
        if (!category || !category.name || typeof category.name !== 'string') {
            return res.status(400).json({ error: 'category must have a valid name' });
        }
        if (!informationMoto || !informationMoto.nameMoto || typeof informationMoto.price !== 'number' || !Array.isArray(informationMoto.imagesMoto) || informationMoto.imagesMoto.length !== 4) {
            return res.status(400).json({ error: 'informationMoto must have valid nameMoto, price, and exactly four images' });
        }

        if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'email is required and must be a valid email address' });
        }
        // Check if a motorcycle with the same numberPlate already exists
        const existingMotorcycleSnapshot = await db.collection('motorcycles')
        .where('numberPlate', '==', numberPlate)
        .get();

        // Check if any documents were returned
        if (!existingMotorcycleSnapshot.empty) {
            return res.status(409).json({ error: 'A motorcycle with this numberPlate already exists' });
        }

        let addressInstance = null;
        if (address) {
            addressInstance = new Address(address.streetName, address.district, address.city, address.country);
        }

        // Create an instance of InformationMoto
        const informationMotoInstance = new InformationMoto(
            informationMoto.nameMoto,
            informationMoto.price,
            informationMoto.description,
            informationMoto.energy,
            informationMoto.vehicleMass,
            informationMoto.imagesMoto
        );

        // Call addMotorcycle with only `name` for companyMoto and category
        const newMotorcycle = await motorcycleService.addMotorcycle(
            numberPlate,
            companyMoto.name,  // Only pass the `name` of `companyMoto`
            category.name,      // Only pass the `name` of `category`
            informationMotoInstance,
            isActive,
            isHide,
            email,
            addressInstance
        );

        // Respond with the created motorcycle
        res.status(201).json(newMotorcycle);
    } catch (error) {
        console.error('Detailed Error:', error.stack);
        res.status(500).json({ error: 'An error occurred while adding the motorcycle' });
        console.error('Error adding motorcycle:', error.message); // Log the specific error
    }
};








