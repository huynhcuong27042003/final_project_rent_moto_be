// services/CompanyMotoService.js
const CompanyMoto = require('../models/companyMoto');
const db = require('../firebase');

class CompanyMotoService {
  async addCompanyMoto(name, isHide) {
    const newMoto = new CompanyMoto(name, isHide);
    const newDoc = await db.collection('companyMotos').add(newMoto.toObject());
    return { id: newDoc.id, ...newMoto.toObject() };
  }

  async getCompanyMoto(id) {
    const doc = await db.collection('companyMotos').doc(id).get();
    if (!doc.exists) {
      throw new Error(`CompanyMoto with id ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async updateCompanyMoto(id, name, isHide) {
    const docRef = db.collection('companyMotos').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`CompanyMoto with id ${id} not found`);
    }
    const updatedMoto = new CompanyMoto(name, isHide);
    await docRef.update(updatedMoto.toObject());
    return { id, ...updatedMoto.toObject() };
  }

  async getAllCompanyMotos() {
    const snapshot = await db.collection('companyMotos').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = new CompanyMotoService();
