const ReviewService = require('../../services/reviewService');
const reviewService = new ReviewService();

exports.getReview = async (req, res) => {
    try {
        // Extract review ID from the request parameters
        const { id } = req.params;

        // Fetch review from ReviewService
        const review = await reviewService.getReview(id);

        // If review is found, send it as the response
        res.status(200).json({ success: true, review });
    } catch (error) {
        console.error('Error fetching review:', error);
        
        // If there's an error, send a 500 error with the error message
        res.status(500).json({ success: false, message: error.message });
    }
};
