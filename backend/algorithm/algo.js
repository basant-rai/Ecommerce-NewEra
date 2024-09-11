const User = require('..//Model/userModel');
const Product = require('../Model/productModel');

// Helper functions for cosine similarity
const calculateCosineSimilarity = (A, B) => {
  const dotProduct = getDotProduct(A, B);
  const magnitudeA = getMagnitude(A);
  const magnitudeB = getMagnitude(B);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  return dotProduct / (magnitudeA * magnitudeB);
};

const getDotProduct = (A, B) => {
  let dotProduct = 0;
  for (const key in A) {
    if (B.hasOwnProperty(key)) {
      dotProduct += A[key] * B[key];
    }
  }
  return dotProduct;
};

const getMagnitude = (vector) => {
  let sumOfSquares = 0;
  for (const key in vector) {
    sumOfSquares += vector[key] * vector[key];
  }
  return Math.sqrt(sumOfSquares);
};

// Collaborative Filtering Algorithm
const collaborativeFiltering = async (userId) => {
  const users = await User.find().populate('ratings.productId');
  const targetUser = await User.findById(userId).populate('ratings.productId');

  const userItemMatrix = {};
  users.forEach(user => {
    userItemMatrix[user._id] = {};
    user.ratings.forEach(rating => {
      userItemMatrix[user._id][rating.productId._id] = rating.rating;
    });

    // Add purchased products with a default score if not rated
    user.purchaseHistory.forEach(purchase => {
      if (!userItemMatrix[user._id][purchase.productId]) {
        userItemMatrix[user._id][purchase.productId] = 3; // Default score for purchased products
      }
    });
  });

  const similarityScores = calculateSimilarity(userItemMatrix, targetUser._id);
  const recommendations = recommendProducts(userItemMatrix, similarityScores, targetUser._id);

  return recommendations;
};

// Calculate similarity scores between the target user and other users
const calculateSimilarity = (matrix, targetUserId) => {
  const targetRatings = matrix[targetUserId];
  const similarityScores = {};

  for (const userId in matrix) {
    if (userId !== targetUserId) {
      const similarity = calculateCosineSimilarity(targetRatings, matrix[userId]);
      similarityScores[userId] = similarity;
    }
  }

  return similarityScores;
};

// Recommend products that the target user has not yet rated
const recommendProducts = (matrix, similarityScores, targetUserId) => {
  const recommendations = {};

  for (const userId in similarityScores) {
    const similarity = similarityScores[userId];

    for (const productId in matrix[userId]) {
      if (!matrix[targetUserId] || !matrix[targetUserId][productId]) {
        if (!recommendations[productId]) {
          recommendations[productId] = 0;
        }
        recommendations[productId] += similarity * matrix[userId][productId];
      }
    }
  }

  const recommendationsArray = Object.keys(recommendations).map(productId => ({
    productId,
    score: recommendations[productId]
  }));

  recommendationsArray.sort((a, b) => b.score - a.score);
  // return recommendationsArray.slice(0, 5);

  return recommendationsArray;
};

// Content-Based Filtering Algorithm
const contentBasedFiltering = async (userId) => {
  const user = await User.findById(userId).populate('purchaseHistory.productId');
  const userProfile = buildUserProfile(user.purchaseHistory);

  const products = await Product.find();
  const recommendations = products.map(product => {
    const similarity = calculateCosineSimilarity(userProfile, product.tags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {}));
    return { product, similarity };
  });

  recommendations.sort((a, b) => b.similarity - a.similarity);
  return recommendations;
};

const buildUserProfile = (purchaseHistory) => {
  const tagFrequency = {};

  purchaseHistory.forEach(purchase => {
    purchase.productId.tags.forEach(tag => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  return tagFrequency;
};

// Hybrid Recommendation Algorithm
const hybridRecommendation = async (userId) => {
  const collaborativeRecs = await collaborativeFiltering(userId);
  const contentBasedRecs = await contentBasedFiltering(userId);

  const combinedRecs = {};

  collaborativeRecs.forEach(rec => {
    combinedRecs[rec.productId] = { score: rec.score * 0.7 };
  });

  contentBasedRecs.forEach(rec => {
    if (combinedRecs[rec.product._id]) {
      combinedRecs[rec.product._id].score += rec.similarity * 0.3;
    } else {
      combinedRecs[rec.product._id] = { score: rec.similarity * 0.3 };
    }
  });

  const finalRecs = Object.keys(combinedRecs)
    .map(productId => ({ productId, score: combinedRecs[productId].score }))
    .sort((a, b) => b.score - a.score);

  return finalRecs.slice(0, 5);
  // return finalRecs;

};

module.exports = { collaborativeFiltering, contentBasedFiltering, hybridRecommendation };
