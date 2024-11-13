// In getAcceptedMotorcycles.js
const MotorcycleService = require('../../services/motorcycleService'); // Ensure this path is correct
const motorcycleService = new MotorcycleService();

exports.getAcceptedMotorcycles = async (req, res) => {
    const { id } = req.params;  // Get 'id' from the URL params

    try {
        if (id) {
            // If 'id' is provided, fetch a specific motorcycle by ID
            const motorcycle = await motorcycleService.getMotorcycle(id);

            if (!motorcycle) {
                return res.status(404).json({ status: 'error', message: `Motorcycle with ID ${id} not found or is hidden.` });
            }

            // Check if the motorcycle is accepted (isHide is false)
            if (motorcycle.isHide === false) {
                return res.status(200).json({ status: 'success', data: motorcycle });
            } else {
                return res.status(404).json({ status: 'error', message: `Motorcycle with ID ${id} is not accepted (isHide = true).` });
            }
        } else {
            // If no 'id' is provided, fetch all accepted motorcycles (where isHide is false)
            const motorcycles = await motorcycleService.getAllMotorcyclesIsAccept();
            return res.status(200).json({ status: 'success', data: motorcycles });
        }
    } catch (error) {
        console.error('Detailed Error:', error.stack);
        return res.status(500).json({ status: 'error', message: 'An error occurred while retrieving the motorcycle(s).' });
    }
};
