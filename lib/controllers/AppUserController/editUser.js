const AppUserService = require('../../services/appUserService'); // Adjust the path if necessary

// // Update a user by ID
// exports.editUser = async (req, res) => {
//     const { id } = req.params;
//     const updatedFields = req.body;

//     try {
//         // Update user
//         const updatedUser = await AppUserService.updateUser(id, updatedFields);
//         res.status(200).json(updatedUser);

//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// Update a user by ID
exports.editUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
    const updatedFields = req.body; // Get the updated fields from the request body

    try {
        // Prevent updating of email, role, and isHide
        const { email, role, isHide, ...filteredFields } = updatedFields;

        // Validate if there are fields left to update
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ error: 'No fields to update other than email, role, or isHide.' });
        }

        // Update user using the AppUserService with filtered fields
        const updatedUser = await AppUserService.updateUser(id, filteredFields);
        res.status(200).json(updatedUser); // Return the updated user data
        
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message }); // Handle user not found error
        }
        return res.status(500).json({ error: 'An error occurred while updating the user' }); // Handle general error
    }
};
