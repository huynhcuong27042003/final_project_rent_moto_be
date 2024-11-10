const MotorcycleService = require('../../services/motorcycleService'); // Ensure correct path
const motorcycleService = new MotorcycleService();

exports.editMotorcycle = async (req, res) => {
    const motorcycleId = req.params.id;
    const updates = req.body;

    try {
        const updatedMotorcycle = await motorcycleService.updateMotorcycle(motorcycleId, updates);
        res.status(200).json(updatedMotorcycle); // Send updated motorcycle data
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
};

