// controllers/editCompanyMoto.js
const companyMotoService = require('../../services/companyMotoService');

exports.editCompanyMoto = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, isHide } = req.body;

    // Validate input data
    if (!id) {
      return res.status(400).json({ error: 'No ID provided' });
    }
    if (!name || typeof isHide !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const updatedMoto = await companyMotoService.updateCompanyMoto(id, name, isHide);
    res.json(updatedMoto);
  } catch (error) {
    console.error('Error editing company motto:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};



