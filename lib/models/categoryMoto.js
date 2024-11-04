// models/CategoryMoto.js
class CategoryMoto {
    constructor(name, isHide) {
        this._name = name; // Private attribute
        this._isHide = Boolean(isHide); // Ensure isHide is a boolean
    }

    // Getters to access private attributes
    get name() {
        return this._name;
    }

    get isHide() {
        return this._isHide;
    }

    // Convert instance to a plain object for Firestore
    toObject() {
        return {
            name: this._name,
            isHide: this._isHide,
        };
    }

    // Static method to create an instance from a Firestore document
    static fromFirebase(doc) {
        const data = doc.data();
        if (!data) {
            throw new Error('No data found in Firestore document');
        }

        // Check if required fields exist
        const { name, isHide } = data;
        if (name === undefined || isHide === undefined) {
            throw new Error('Name or isHide is undefined in Firestore document');
        }

        return new CategoryMoto(name, isHide);
    }
}

module.exports = CategoryMoto; // Export the CategoryMoto class
