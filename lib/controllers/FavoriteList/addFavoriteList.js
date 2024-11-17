const FavoriteListService = require('../../services/favoriteListService'); // Import the FavoriteListService

exports.addFavoriteList = async (req, res) => {
  const { email, favoriteList } = req.body; // Assuming the data comes in the request body

  // Validate the inputs
  if (!email || !Array.isArray(favoriteList)) {
    return res.status(400).json({ error: 'Email and favorite list are required. Favorite list must be an array.' });
  }

  try {
    // Call the FavoriteListService to update the user's favorite list
    const result = await FavoriteListService.updateFavoriteList(email, favoriteList);
    
    // Return success message
    return res.status(200).json({ message: result });
  } catch (error) {
    // Handle any errors, such as user not found or invalid motorcycle IDs
    return res.status(500).json({ error: error.message });
  }
};
