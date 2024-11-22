// services/PromotionService.js
const Promotion = require('../models/promotion');
const db = require('../firebase');

class PromotionService {
  async addPromotion(name, discount, isHide, startDate, endDate, image, code) {
    // Updated constructor to include discount
    const newPromotion = new Promotion(name, code, startDate, endDate, image, isHide, discount);

    console.log('Code before saving:', code);

    // Save promotion to Firestore
    const newDoc = await db.collection('promotions').add(newPromotion.toObject());
    const addedPromotion = { id: newDoc.id, ...newPromotion.toObject() };

    if (!addedPromotion.code) {
      throw new Error('Failed to add promotion with code');
    }

    return addedPromotion;
  }

  // Phương thức để lấy khuyến mãi theo ID
  async getPromotionById(id) {
    const doc = await db.collection('promotions').doc(id).get(); // Lấy document theo ID
    if (!doc.exists) {
      throw new Error(`Promotion with id ${id} not found`); // Nếu không tìm thấy khuyến mãi
    }
    return { id: doc.id, ...doc.data() }; // Trả về dữ liệu của khuyến mãi
  }

  // Phương thức để lấy tất cả các khuyến mãi
  async getAllPromotions() {
    const snapshot = await db.collection('promotions').get(); // Lấy tất cả các document trong collection
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Trả về danh sách khuyến mãi
  }

  // Phương thức để cập nhật thông tin khuyến mãi
  async updatePromotion(id, name, code, discount, startDate, endDate, image, isHide) {
    const docRef = db.collection('promotions').doc(id); // Lấy document theo ID
    const doc = await docRef.get(); // Lấy dữ liệu của document đó
    if (!doc.exists) {
      throw new Error(`Promotion with id ${id} not found`); // Nếu không tìm thấy khuyến mãi
    }

    // Cập nhật đối tượng Promotion với discount
    const updatedPromotion = new Promotion(name, code, startDate, endDate, image, isHide, discount);
    await docRef.update(updatedPromotion.toObject()); // Cập nhật vào Firestore
    return { id, ...updatedPromotion.toObject() }; // Trả về ID và các trường cập nhật của khuyến mãi
  }

  // Lọc các khuyến mãi theo code và isHide
  async getAllPromotionsFiltered(code, isHide) {
    let query = db.collection('promotions');

    if (code) {
      query = query.where('code', '==', code);
    }

    if (isHide !== undefined) {
      query = query.where('isHide', '==', isHide);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

// Phương thức để xóa khuyến mãi (nếu cần)
// async deletePromotion(id) {
//   const docRef = db.collection('promotions').doc(id); // Lấy document theo ID
//   const doc = await docRef.get(); // Kiểm tra nếu document tồn tại
//   if (!doc.exists) {
//     throw new Error(`Promotion with id ${id} not found`); // Nếu không tìm thấy khuyến mãi
//   }
//   await docRef.delete(); // Xóa khuyến mãi khỏi Firestore
//   return id; // Trả về ID của khuyến mãi đã xóa
// }

module.exports = new PromotionService(); // Xuất instance của PromotionService
