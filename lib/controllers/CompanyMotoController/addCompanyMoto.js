// controllers/addCompanyMoto.js
const companyMotoService = require('../../services/companyMotoService');

exports.addCompanyMoto = async (req, res) => {
  try {
    const { name, isHide } = req.body;

    // Validate input data
    if (!name || typeof isHide !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newMoto = await companyMotoService.addCompanyMoto(name, isHide);
    res.status(201).json(newMoto);
  } catch (error) {
    console.error('Error adding company motto:', error);
    res.status(500).json({ error: error.message });
  }
};






