const db = require('../firebase'); // Ensure Firebase is configured
const auth = require('../firebaseAuth'); // Import Firebase Authentication for user checks
const Review = require('../models/review'); // Assuming Review class is imported

class ReviewService {
    constructor() {
        this.reviewsCollection = db.collection('reviews'); // Reference to the 'reviews' collection
    }

    // Add a new review
    async addReview(email, numberPlate, numberStars, comment) {
        try {
            // Check if the user exists using Firebase Authentication
            const existingUser = await auth.getUserByEmail(email);
            if (!existingUser) {
                throw new Error('Account does not exist with this email.');
            }

            // Create a new Review instance
            const newReview = new Review(email, numberPlate,numberStars, comment);

            // Add review to Firestore
            const docRef = await this.reviewsCollection.add(newReview.toObject());
            console.log('Review added with ID:', docRef.id);

            // Return the new review with its Firestore ID
            return { id: docRef.id, ...newReview.toObject() };
        } catch (error) {
            console.error('Error adding review:', error);
            throw new Error('Could not add review');
        }
    }

    // Get a review by its ID
    async getReview(id) {
        try {
            const doc = await this.reviewsCollection.doc(id).get(); // Fetch review by ID
            if (!doc.exists) {
                throw new Error(`Review with ID ${id} not found.`);
            }
            return { id: doc.id, ...doc.data() }; // Return review data along with ID
        } catch (error) {
            console.error('Error getting review:', error);
            throw new Error(`Could not fetch review with ID ${id}`);
        }
    }

    async getReviewByNumberPlate(numberPlate) {
        try {
            // Query Firestore to get all reviews with the same numberPlate
            const querySnapshot = await this.reviewsCollection.where('numberPlate', '==', numberPlate).get();

            if (querySnapshot.empty) {
                throw new Error(`No reviews found for number plate ${numberPlate}.`);
            }

            // Map the query results to an array of review objects
            const reviews = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return reviews; // Return the reviews found
        } catch (error) {
            console.error('Error getting reviews by number plate:', error);
            throw new Error('Could not fetch reviews by number plate');
        }
    }

    async updateReview(id, updates) {
        try {
            const docRef = this.reviewsCollection.doc(id);
            const doc = await docRef.get(); // Fetch existing review
    
            if (!doc.exists) {
                throw new Error(`Review with ID ${id} not found.`);
            }
    
            // Prepare updated data by merging existing data with provided updates
            const currentData = doc.data();
    
            // Exclude fields that should not be updated
            const { email, numberPlate, ...allowedUpdates } = updates; // Destructure to remove email and numberPlate
    
            const updatedData = { ...currentData, ...allowedUpdates };
    
    
            // Save the updated data back to Firestore
            await docRef.update(updatedData);
            console.log(`Review with ID ${id} updated successfully`);
    
            // Return the updated review
            return { id, ...updatedData };
        } catch (error) {
            console.error('Error updating review:', error);
            throw new Error('Could not update review');
        }
    }
}

module.exports = ReviewService;
