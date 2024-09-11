const User = require('../Model/userModel');
const Product = require('../Model/productModel');
const { hybridRecommendation } = require('./algo');

const getSortedProducts = async (productIds, sortType) => {
  let sortQuery;

  switch (sortType) {
    case 'priceAsc':
      sortQuery = { productPrice: 1 };
      break;
    case 'priceDesc':
      sortQuery = { productPrice: -1 };
      break;
    case 'rating':
      sortQuery = { productRating: -1 };
      break;
    case 'popularity':
      sortQuery = { totalProduct: -1 };
      break;
    default:
      sortQuery = {};
  }
  const products = await Product.find({ _id: { $in: productIds } }).sort(sortQuery);
  return products;
};

exports.getRecommendations = async (req, res) => {
  const { userId } = req.params;
  const { sortType } = req.query
  try {
    const recommendations = await hybridRecommendation(userId);
    const recommendedProductIds = recommendations.map(rec => rec.productId);
    const topRecommendations = await getSortedProducts(recommendedProductIds, sortType);

    res.status(200).json({ products: topRecommendations });
    // res.status(200).json({ topRecommendations, recommendations });

  } catch (error) {
    console.log("🚀 ~ exports.getRecommendations= ~ error:", error)
    res.status(500).json({ error: 'Internal server error' });
  }
};