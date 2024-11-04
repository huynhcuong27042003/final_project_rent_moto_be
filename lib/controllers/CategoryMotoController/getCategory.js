// controllers/getCategoryMoto.js
const categoryMotoService = require('../../services/categoryMotoService');

exports.getCategoryMoto = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if ID is provided to retrieve a single category moto
        if (id) {
            const categoryMoto = await categoryMotoService.getCategoryMoto(id);
            return res.json(categoryMoto);
        }

        // If no ID is provided, return all category mottos
        const allCategoryMotos = await categoryMotoService.getAllCategoryMotos();
        return res.json(allCategoryMotos);
    } catch (error) {
        console.error('Error retrieving category moto:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'An error occurred while retrieving the category moto.' });
        }
    }
};
