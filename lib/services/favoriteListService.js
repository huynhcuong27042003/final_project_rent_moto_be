const db = require('../firebase'); // Assuming you're using Firebase or a similar database

class FavoriteListService {
  static async updateFavoriteList(email, favoriteList) {
    // Fetch the user document by email
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      throw new Error('User not found.');
    }

    // Assuming there will only be one document with the email, we'll grab the first one
    const userDoc = userSnapshot.docs[0];

    // Get the current favorite list of the user
    const currentFavoriteList = userDoc.data().favoriteList || [];

    // Check if all motorcycleIds in the favoriteList exist in the motorcycles collection
    const invalidMotorcycleIds = [];
    for (const motorcycleId of favoriteList) {
      const motorcycleSnapshot = await db.collection('motorcycles').doc(motorcycleId).get();
      if (!motorcycleSnapshot.exists) {
        invalidMotorcycleIds.push(motorcycleId); // Add invalid motorcycleId to the list
      }
    }

    // If any motorcycleId is invalid, throw an error with the invalid ids
    if (invalidMotorcycleIds.length > 0) {
      throw new Error(`Invalid motorcycle IDs: ${invalidMotorcycleIds.join(', ')}`);
    }

    // Merge current favorite list with the new favorite list and remove duplicates
    const updatedFavoriteList = [
      ...new Set([...currentFavoriteList, ...favoriteList]) // Merge and remove duplicates
    ];

    // Update the user's favorite list in the database
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
    return userDoc.data().favoriteList || []; // Trả về danh sách yêu thích của người dùng
  }

  // Xóa một motorcycleId khỏi danh sách yêu thích của người dùng
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
}

module.exports = FavoriteListService;

