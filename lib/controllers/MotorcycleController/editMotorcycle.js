const MotorcycleService = require('../../services/motorcycleService'); // Ensure correct path
const motorcycleService = new MotorcycleService(); // Instantiate MotorcycleService

exports.editMotorcycle = async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const updatedFields = req.body; // Get the fields to update from the request body

    // Validate the updated fields
    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    try {
        // Check if the motorcycle exists
        const existingMotorcycle = await motorcycleService.getMotorcycle(id);
        if (!existingMotorcycle) {
            return res.status(404).json({ error: `Motorcycle with ID ${id} not found` });
        }

        // Update the motorcycle using the service method
        const updatedMotorcycle = await motorcycleService.updateMotorcycle(id, updatedFields);
        return res.status(200).json({ status: 'success', data: updatedMotorcycle });
    } catch (error) {
        // Handle specific errors
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        console.error('Detailed Error:', error.stack); // Log error details for debugging
        return res.status(500).json({ error: 'An error occurred while updating the motorcycle' });
    }
};
