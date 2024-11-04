// models/CompanyMoto.js
class CompanyMoto {
    constructor(name, isHide) {
      this._name = name;    // Sử dụng _name cho thuộc tính nội bộ
      this._isHide = Boolean(isHide); // Đảm bảo isHide là boolean
    }
  
    // Getters để công khai các trường giống như thuộc tính riêng
    get name() {
      return this._name;
    }
  
    get isHide() {
      return this._isHide;
    }
  
    // Chuyển đổi instance thành một object thuần cho Firebase
    toObject() {
      return {
        name: this._name,
        isHide: this._isHide,
      };
    }
  
    // Chuyển đổi thành JSON nếu cần
    toJSON() {
      return this.toObject();
    }
  
    // Phương thức tĩnh để tạo một instance từ một tài liệu Firestore
    static fromFirebase(doc) {
      const data = doc.data();
      if (!data) {
        throw new Error('No data found in Firestore document'); // Kiểm tra xem có dữ liệu hay không
      }
  
      // Kiểm tra xem trường name và isHide có tồn tại không
      const { name, isHide } = data;
      if (name === undefined || isHide === undefined) {
        throw new Error('Name or isHide is undefined in Firestore document');
      }
  
      return new CompanyMoto(name, isHide);
    }
  }
  
  module.exports = CompanyMoto; // Xuất đối tượng CompanyMoto
  