const MotorcycleService = require('../../services/motorcycleService'); // Import the FavoriteListService

exports.getMotorcycleListByUser = async (req, res) => {
    const { userId } = req.params; // Retrieve userId from request params
  
    // Log the userId for debugging purposes
    console.log("Received userId:", userId);
  
    // Check if userId is valid
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing userId parameter.',
      });
    }
  
    try {
      const motorcycleList = await MotorcycleService.getMotorcycleListByUser(userId);
  
      res.status(200).json({
        success: true,
        message: 'Motorcycle list fetched successfully.',
        data: motorcycleList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'An error occurred while fetching the motorcycle list.',
      });
    }
  };
  