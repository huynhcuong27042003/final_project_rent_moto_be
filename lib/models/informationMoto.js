// InformationMoto.js
class InformationMoto {
    constructor(nameMoto, price, description, energy, vehicleMass, images) {
        // Validate properties
        if (typeof nameMoto !== 'string' || nameMoto.trim() === '') {
            throw new TypeError("nameMoto must be a non-empty string.");
        }
        if (typeof price !== 'number' || price < 0) {
            throw new TypeError("price must be a non-negative number.");
        }
        if (typeof description !== 'string') {
            throw new TypeError("description must be a string.");
        }
        if (typeof energy !== 'string') {
            throw new TypeError("energy must be a string.");
        }
        if (typeof vehicleMass !== 'number' || vehicleMass <= 0) {
            throw new TypeError("vehicleMass must be a positive number.");
        }
        if (!Array.isArray(images) || images.length !== 4) {
            throw new TypeError("images must be an array of four image URLs.");
        }
  
        this._nameMoto = nameMoto;
        this._price = price;
        this._description = description;
        this._energy = energy; // Fixed typo
        this._vehicleMass = vehicleMass;
        this._images = images; // Changed to an array for simplicity
    }
  
    // Method to convert properties to a plain object
    toObject() {
        return {
            nameMoto: this._nameMoto,
            price: this._price,
            description: this._description,
            energy: this._energy,
            vehicleMass: this._vehicleMass,
            images: this._images, // Return the array of images
        };
    }
  
    // Optionally, add a method to update the price
    updatePrice(newPrice) {
        if (typeof newPrice !== 'number' || newPrice < 0) {
            throw new TypeError("price must be a non-negative number.");
        }
        this._price = newPrice;
    }
  
    // Optionally, add a method to update the description
    updateDescription(newDescription) {
        if (typeof newDescription !== 'string') {
            throw new TypeError("description must be a string.");
        }
        this._description = newDescription;
    }
  }
  
  module.exports = InformationMoto;
  