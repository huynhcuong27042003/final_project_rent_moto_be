const MotorcycleService = require('../../services/motorcycleService'); // Ensure this path is correct
const motorcycleService = new MotorcycleService();

exports.getMotorcycle = async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters

    try {
        if (id) {
            // If ID is provided, fetch the specific motorcycle
            const motorcycle = await motorcycleService.getMotorcycle(id);
            return res.status(200).json({ status: 'success', data: motorcycle });
        } else {
            // If ID is not provided, fetch all motorcycles
            const motorcycles = await motorcycleService.getAllMotorcycles();
            return res.status(200).json({ status: 'success', data: motorcycles });
        }
    } catch (error) {
        console.error('Detailed Error:', error.stack);
        return res.status(500).json({ error: 'An error occurred while retrieving the motorcycle(s)' });
    }
};
