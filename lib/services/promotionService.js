const Promotion = require('../models/promotion');
const db = require('../firebase');

class PromotionService {

  async addPromotion(name, discount, isHide, startDate, endDate, image, code) {

    if (!name || !code || !startDate || !endDate || !image) {
      throw new Error('All fields must be provided');
    }

    if (discount === undefined || isNaN(discount) || discount < 0) {
      throw new Error('Discount must be a valid number greater than or equal to 0');
    }

    const newPromotion = new Promotion(name, code, startDate, endDate, image, isHide, discount);

    console.log('Code before saving:', code);

    const newDoc = await db.collection('promotions').add(newPromotion.toObject());
    const addedPromotion = { id: newDoc.id, ...newPromotion.toObject() };

    if (!addedPromotion.code) {
      throw new Error('Failed to add promotion with code');
    }

    return addedPromotion;
  }

  async getPromotionById(id) {
    const doc = await db.collection('promotions').doc(id).get();
    if (!doc.exists) {
      throw new Error(`Promotion with id ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async updatePromotionByCode(code, name, discount, startDate, endDate, image, isHide) {
    if (!code || !name || !startDate || !endDate || !image) {
      throw new Error('All fields must be provided');
    }

    if (discount === undefined || isNaN(discount) || discount < 0) {
      throw new Error('Discount must be a valid number greater than or equal to 0');
    }

    const snapshot = await db.collection('promotions').where('code', '==', code).get();

    if (snapshot.empty) {
      throw new Error(`Promotion with code ${code} not found`);
    }
    const doc = snapshot.docs[0];
    const updatedPromotion = new Promotion(name, code, startDate, endDate, image, isHide, discount);

    await doc.ref.update(updatedPromotion.toObject());


    return { code, ...updatedPromotion.toObject() }; 
}


  async getAllPromotions() {
    const snapshot = await db.collection('promotions').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updatePromotion(id, name, code, discount, startDate, endDate, image, isHide) {
    const docRef = db.collection('promotions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Promotion with id ${id} not found`);
    }

    // Kiểm tra các tham số đầu vào
    if (!name || !code || !startDate || !endDate || !image) {
      throw new Error('All fields must be provided');
    }

    if (discount === undefined || isNaN(discount) || discount < 0) {
      throw new Error('Discount must be a valid number greater than or equal to 0');
    }

    // Cập nhật đối tượng Promotion với discount
    const updatedPromotion = new Promotion(name, code, startDate, endDate, image, isHide, discount);
    await docRef.update(updatedPromotion.toObject()); 

    return { id, ...updatedPromotion.toObject() };
  }
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

module.exports = new PromotionService();
