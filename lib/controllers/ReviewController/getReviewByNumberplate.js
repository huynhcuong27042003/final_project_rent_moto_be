const ReviewService = require('../../services/reviewService');
const reviewService = new ReviewService();

exports.getReviewByNumberPlate = async (req, res) => {
    const { numberPlate } = req.params; // Get the number plate from the request params

    try {
        // Call the getReviewByNumberPlate method from ReviewService
        const reviews = await reviewService.getReviewByNumberPlate(numberPlate);

        // Respond with success and the retrieved reviews
        res.status(200).json({
            success: true,
            message: `Found ${reviews.length} reviews for number plate ${numberPlate}.`,
            data: reviews,
        });
    } catch (error) {
        // If an error occurs, respond with failure and the error message
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
