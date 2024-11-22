const FavoriteListService = require('../../services/favoriteListService'); // Import the FavoriteListService

// Controller function to get the favorite list
exports.getFavoriteListByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Retrieve userId from request parameters

    // Call the service method to get the favorite motorcycles list by userId
    const favoriteMotorcycles = await FavoriteListService.getFavoriteListByUser(userId);

    // Respond with the favorite motorcycles list
    res.status(200).json({
      success: true,
      message: 'Favorite list fetched successfully.',
      data: favoriteMotorcycles,
    });
  } catch (error) {
    // Catch errors and send an appropriate response
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching the favorite list.',
    });
  }
};
