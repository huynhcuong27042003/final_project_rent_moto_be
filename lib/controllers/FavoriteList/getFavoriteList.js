const FavoriteListService = require('../../services/favoriteListService'); // Import the FavoriteListService

// Controller function to get the favorite list
exports.getFavoriteList = async (req, res) => {
  const { email } = req.params; // Assuming the email is passed in the request params

  try {
    // Call the FavoriteListService to get the favorite list for the given email
    const favoriteList = await FavoriteListService.getFavoriteList(email);

    // If no favorite list exists, send a response with an empty array
    res.status(200).json({
      success: true,
      message: 'Favorite list fetched successfully.',
      data: favoriteList,
    });
  } catch (error) {
    // Catch errors and send an appropriate response
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching the favorite list.',
    });
  }
};
