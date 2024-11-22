const db = require('../firebase'); 

class FavoriteListService {
  static async updateFavoriteList(email, favoriteList) {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      throw new Error('User not found.');
    }

    const userDoc = userSnapshot.docs[0];

    const currentFavoriteList = userDoc.data().favoriteList || [];

    const invalidMotorcycleIds = [];
    for (const motorcycleId of favoriteList) {
      const motorcycleSnapshot = await db.collection('motorcycles').doc(motorcycleId).get();
      if (!motorcycleSnapshot.exists) {
        invalidMotorcycleIds.push(motorcycleId); // Add invalid motorcycleId to the list
      }
    }

    if (invalidMotorcycleIds.length > 0) {
      throw new Error(`Invalid motorcycle IDs: ${invalidMotorcycleIds.join(', ')}`);
    }

    const updatedFavoriteList = [
      ...new Set([...currentFavoriteList, ...favoriteList]) // Merge and remove duplicates
    ];

    await db.collection('users').doc(userDoc.id).update({
      favoriteList: updatedFavoriteList,
    });

    return 'Favorite list updated successfully';
  }

  static async getFavoriteList(email) {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      throw new Error('User not found.');
    }

    const userDoc = userSnapshot.docs[0];
    return userDoc.data().favoriteList || [];
  }

  static async deleteFavoriteItem(email, motorcycleId) {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      throw new Error('User not found.');
    }

    const userDoc = userSnapshot.docs[0];
    let currentFavoriteList = userDoc.data().favoriteList || [];

    // Kiểm tra xem motorcycleId có trong danh sách yêu thích không
    if (!currentFavoriteList.includes(motorcycleId)) {
      throw new Error('Motorcycle ID not found in favorite list.');
    }

    // Loại bỏ motorcycleId khỏi danh sách yêu thích
    currentFavoriteList = currentFavoriteList.filter(id => id !== motorcycleId);

    // Cập nhật lại danh sách yêu thích của người dùng
    await db.collection('users').doc(userDoc.id).update({
      favoriteList: currentFavoriteList,
    });

    return 'Motorcycle removed from favorite list successfully';
  }  

  static async getFavoriteListByUser(userId) {
    try {
      // Fetch the user document by userId directly
      const userDoc = await db.collection('users').doc(userId).get();
  
      if (!userDoc.exists) {
        throw new Error('User not found.');
      }
  
      const favoriteList = userDoc.data().favoriteList || [];
  
      // Fetch detailed motorcycle information for each motorcycle ID in the motorcycle list
      const motorcycleDetails = await Promise.all(
        favoriteList.map(async motorcycleId => {
          const motorcycleSnapshot = await db.collection('motorcycles').doc(motorcycleId).get();
          if (motorcycleSnapshot.exists) {
            return { id: motorcycleId, ...motorcycleSnapshot.data() }; // Combine ID and motorcycle details
          } else {
            return { id: motorcycleId, error: 'Motorcycle not found' }; // Handle missing motorcycle
          }
        })
      );
  
      // Return the detailed list of motorcycles
      return motorcycleDetails;
    } catch (error) {
      throw new Error(`Failed to retrieve motorcycle list: ${error.message}`);
    }
  }
  
}

module.exports = FavoriteListService;

