// controllers/addCategoryMoto.js
const categoryMotoService = require('../../services/categoryMotoService');

exports.addCategoryMoto = async (req, res) => {
    try {
        const { name, isHide } = req.body;

        // Validate input data
        if (!name || typeof isHide !== 'boolean') {
            return res.status(400).json({ error: 'Invalid input data. "name" is required and "isHide" must be a boolean.' });
        }

        const newCategoryMoto = await categoryMotoService.addCategoryMoto(name, isHide);
        res.status(201).json(newCategoryMoto);
    } catch (error) {
        console.error('Error adding category motto:', error);
        res.status(500).json({ error: 'An error occurred while adding the category motto.' });
    }
};
