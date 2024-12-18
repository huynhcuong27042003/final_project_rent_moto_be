const PromoByCompany = require("../models/promoByCompany");
const db = require("../firebase"); // Giả định db đã được khởi tạo từ firebase

class PromoByCompanyService {
  // Thêm một chương trình khuyến mãi
  async addPromoByCompany(
    percentage,
    startDate,
    endDate,
    isHide,
    companyMoto,
    promoName
  ) {
    if (
      percentage === undefined ||
      isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100
    ) {
      throw new Error("Percentage must be a valid number between 0 and 100");
    }

    if (!startDate || !endDate || !companyMoto || !promoName) {
      throw new Error("All fields must be provided");
    }

    const newPromo = new PromoByCompany(
      percentage,
      startDate,
      endDate,
      isHide,
      companyMoto,
      promoName // Added promoName to the constructor
    );

    console.log("Company Moto before saving:", companyMoto);

    const newDoc = await db
      .collection("promotionsByCompany")
      .add(newPromo.toObject());
    const addedPromo = { id: newDoc.id, ...newPromo.toObject() };

    if (!addedPromo) {
      throw new Error("Failed to add promo");
    }

    return addedPromo;
  }

  // Lấy chương trình khuyến mãi theo ID
  async getPromoByCompanyById(id) {
    const doc = await db.collection("promotionsByCompany").doc(id).get();
    if (!doc.exists) {
      throw new Error(`Promo with id ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  // Cập nhật chương trình khuyến mãi theo tên loại xe (companyMoto.name)
  async updatePromoByCompanyByName(
    companyMotoName,
    percentage,
    startDate,
    endDate,
    isHide,
    promoName
  ) {
    if (!companyMotoName || !startDate || !endDate || !promoName) {
      throw new Error("All fields must be provided");
    }

    if (
      percentage === undefined ||
      isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100
    ) {
      throw new Error("Percentage must be a valid number between 0 and 100");
    }

    const snapshot = await db
      .collection("promotionsByCompany")
      .where("companyMoto.name", "==", companyMotoName)
      .get();

    if (snapshot.empty) {
      throw new Error(
        `Promo with companyMoto name ${companyMotoName} not found`
      );
    }

    const doc = snapshot.docs[0];
    const updatedPromo = new PromoByCompany(
      percentage,
      startDate,
      endDate,
      isHide,
      { name: companyMotoName },
      promoName // Added promoName to the updated promo
    );

    await doc.ref.update(updatedPromo.toObject());

    return { companyMotoName, promoName, ...updatedPromo.toObject() };
  }

  // Lấy tất cả các chương trình khuyến mãi
  async getAllPromosByCompany() {
    const snapshot = await db.collection("promotionsByCompany").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // Cập nhật chương trình khuyến mãi theo ID
  async updatePromoByCompany(
    id,
    percentage,
    startDate,
    endDate,
    isHide,
    companyMoto,
    promoName
  ) {
    const docRef = db.collection("promotionsByCompany").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Promo with id ${id} not found`);
    }

    if (
      percentage === undefined ||
      isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100
    ) {
      throw new Error("Percentage must be a valid number between 0 and 100");
    }

    const updatedPromo = new PromoByCompany(
      percentage,
      startDate,
      endDate,
      isHide,
      companyMoto,
      promoName // Added promoName to the updated promo
    );
    await docRef.update(updatedPromo.toObject());

    return { id, ...updatedPromo.toObject() };
  }

  // Lấy tất cả các chương trình khuyến mãi có điều kiện
  async getPromosByCompanyFiltered(companyMotoName) {
    let query = db.collection("promotionsByCompany");

    // Nếu có tên công ty mô tả, thêm điều kiện lọc theo companyMoto.name
    if (companyMotoName) {
      query = query.where("companyMoto.name", "==", companyMotoName);
    }

    // Lấy giá trị isHide từ mô hình hoặc từ nơi nào đó (giả sử là từ một model hoặc một giá trị đã được xác định)
    const isHide = false; // Đặt mặc định là false nếu bạn muốn lọc các bản ghi có isHide = false

    // Thêm điều kiện lọc cho isHide nếu giá trị là false
    query = query.where("isHide", "==", isHide);

    // Lấy kết quả từ cơ sở dữ liệu
    const snapshot = await query.get();

    // Trả về danh sách các kết quả
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = new PromoByCompanyService();
