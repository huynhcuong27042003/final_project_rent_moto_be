const ReviewService = require('../../services/reviewService');
const reviewService = new ReviewService();

exports.addReview = async (req, res) => {
    const { email, numberPlate, numberStars, comment } = req.body;

    try {
        const review = await reviewService.addReview(email, numberPlate, numberStars, comment);
        res.status(201).json({
            success: true,
            message: 'Review added successfully.',
            data: review,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
