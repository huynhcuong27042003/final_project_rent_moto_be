// controllers/getCompanyMoto.js
const companyMotoService = require('../../services/companyMotoService');

exports.getCompanyMoto = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if ID is provided to retrieve a single motto
    if (id) {
      const moto = await companyMotoService.getCompanyMoto(id);
      return res.json(moto);
    }

    // If no ID is provided, return all company mottos
    const allMotos = await companyMotoService.getAllCompanyMotos();
    return res.json(allMotos);
  } catch (error) {
    console.error('Error retrieving company motto:', error);
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred while retrieving the company motto' });
    }
  }
};

