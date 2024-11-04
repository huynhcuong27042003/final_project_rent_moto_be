// controllers/editCategoryMoto.js
const categoryMotoService = require('../../services/categoryMotoService');

exports.editCategoryMoto = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, isHide } = req.body;

        // Validate input data
        if (!id) {
            return res.status(400).json({ error: 'No ID provided' });
        }
        if (!name || typeof isHide !== 'boolean') {
            return res.status(400).json({ error: 'Invalid input data. "name" is required and "isHide" must be a boolean.' });
        }

        const updatedCategoryMoto = await categoryMotoService.updateCategoryMoto(id, name, isHide);
        res.json(updatedCategoryMoto);
    } catch (error) {
        console.error('Error editing category moto:', error);
        res.status(500).json({ error: 'An error occurred while editing the category moto.' });
    }
};
