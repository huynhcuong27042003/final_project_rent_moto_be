const FavoriteListService = require('../../services/favoriteListService'); // Import the FavoriteListService

exports.deleteFavoriteList = async (req, res) => {
    const { email, motorcycleId } = req.params; // Assuming email and motorcycleId are passed in the request params
  
    try {
      // Call the FavoriteListService to delete the motorcycle from the favorite list
      const result = await FavoriteListService.deleteFavoriteItem(email, motorcycleId);
  
      // Send a success response with the result message
      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      // Catch errors and send an appropriate response
      res.status(500).json({
        success: false,
        message: error.message || 'An error occurred while deleting the motorcycle from the favorite list.',
      });
    }
  };