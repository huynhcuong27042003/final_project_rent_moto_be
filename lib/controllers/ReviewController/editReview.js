const ReviewService = require('../../services/reviewService');
const reviewService = new ReviewService();

exports.editReview = async (req, res) => {
    const { id } = req.params; // Get the review ID from the request parameters
    const updates = req.body; // Get the updates from the request body

    try {
        // Use the updateReview method from ReviewService
        const updatedReview = await reviewService.updateReview(id, updates);

        // Respond with success message and updated review data
        res.status(200).json({
            success: true,
            message: 'Review updated successfully.',
            data: updatedReview,
        });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
