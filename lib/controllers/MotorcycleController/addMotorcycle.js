const MotorcycleService = require('../../services/motorcycleService');
const CompanyMoto = require('../../models/companyMoto'); // Nhập khẩu CompanyMoto
const CategoryMoto = require('../../models/categoryMoto'); // Nhập khẩu CategoryMoto
const InformationMoto = require('../../models/informationMoto'); // Nhập khẩu InformationMoto
const db = require('../../firebase'); // Đảm bảo rằng bạn đã cấu hình Firebase
const motorcycleService = new MotorcycleService();

exports.addMotorcycle = async (req, res) => {
    try {
        const { numberPlate, companyMoto, category, informationMoto, isActive, isHide } = req.body;
        
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
        
        // Check if a motorcycle with the same numberPlate already exists
        const existingMotorcycleSnapshot = await db.collection('motorcycles')
        .where('numberPlate', '==', numberPlate)
        .get();

        // Check if any documents were returned
        if (!existingMotorcycleSnapshot.empty) {
            return res.status(409).json({ error: 'A motorcycle with this numberPlate already exists' });
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
            isHide
        );

        // Respond with the created motorcycle
        res.status(201).json(newMotorcycle);
    } catch (error) {
        console.error('Detailed Error:', error.stack);
        res.status(500).json({ error: 'An error occurred while adding the motorcycle' });
        console.error('Error adding motorcycle:', error.message); // Log the specific error
    }
};








