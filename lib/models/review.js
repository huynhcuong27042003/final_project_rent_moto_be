class Review {
    constructor(email, numberPlate, numberStars, comment) {
      this.setEmail(email);
      this.setNumberPlate(numberPlate);
      this.setNumberStars(numberStars);
      this.setComment(comment);
    }
  
    // Setters with validation
    setEmail(email) {
      if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new TypeError("email must be a valid email address.");
      }
      this._email = email.trim();
    }
  
    setNumberPlate(numberPlate) {
      if (typeof numberPlate !== 'string') {
        throw new TypeError("numberPlate must be a string.");
      }
      this._numberPlate = numberPlate;
    }
  
    setNumberStars(numberStars) {
      if (typeof numberStars !== 'number' || numberStars < 1 || numberStars > 5) {
        throw new TypeError("numberStars must be an integer between 1 and 5.");
      }
      this._numberStars = numberStars;
    }
  
    setComment(comment) {
      if (typeof comment !== 'string' || comment.trim().length === 0) {
        throw new TypeError("Comment must be a non-empty string.");
      }
      this._comment = comment.trim();
    }
  
    // Convert instance to plain object
    toObject() {
      return {
        email: this._email,
        numberPlate: this._numberPlate,
        numberStars: this._numberStars,
        comment: this._comment
      };
    }
  }
  
  module.exports = Review;
  