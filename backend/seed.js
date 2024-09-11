const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./Model/productModel'); // Adjust the path as necessary
const User = require('./Model/userModel'); // Adjust the path as necessary
const Category = require('./Model/categoryModel'); // Adjust the path as necessary

require("dotenv").config();


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

const generateCategories = async () => {
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Books',
    'Toys',
    'Health & Personal Care',
    'Automotive',
    'Grocery'
  ];

  await Category.deleteMany({});
  const createdCategories = await Category.insertMany(categories.map(name => ({ categoryName: name })));
  console.log('Categories seeded successfully');
  return createdCategories;
};

const generateProducts = async () => {
  const categories = await Category.find();
  const categoryTags = {
    'Electronics': ['Gadgets', 'Tech', 'Smart', 'Portable'],
    'Fashion': ['Trendy', 'Stylish', 'Comfortable', 'Elegant'],
    'Home & Kitchen': ['Durable', 'Functional', 'Essential', 'Modern'],
    'Sports & Outdoors': ['Athletic', 'Durable', 'Comfortable', 'Adventure'],
    'Books': ['Literary', 'Educational', 'Fiction', 'Non-Fiction'],
    'Toys': ['Fun', 'Educational', 'Interactive', 'Safe'],
    'Health & Personal Care': ['Wellness', 'Nourishing', 'Organic', 'Essential'],
    'Automotive': ['Reliable', 'Durable', 'Innovative', 'Advanced'],
    'Grocery': ['Fresh', 'Organic', 'Healthy', 'Daily Essentials']
  };

  const products = Array.from({ length: 100 }, () => {
    const category = faker.helpers.arrayElement(categories);
    const categoryName = category.categoryName;
    const tags = categoryTags[categoryName] || ['General'];

    return {
      productName: faker.commerce.productName(),
      productPrice: parseFloat(faker.commerce.price()), // Ensure price is a number
      productDescription: faker.lorem.paragraph(),
      productRating: faker.number.int({ min: 1, max: 5 }), // Ensure rating is an integer
      productCategory: category._id,
      tags: faker.helpers.arrayElements(tags, { min: 1, max: 3 }),
      productImage: faker.image.url(),
      totalProduct: faker.number.int({ min: 1, max: 100 }) // Ensure quantity is a number
    };
  });

  await Product.insertMany(products);
  console.log('Products seeded successfully');
};

const generateUsers = async () => {
  const products = await Product.find();

  const users = Array.from({ length: 20 }, () => {
    const purchasedProducts = faker.helpers.arrayElements(products, { min: 1, max: 5 }).map(product => ({
      productId: product._id,
      purchasedAt: faker.date.past()
    }));

    const ratings = products.map(product => ({
      productId: product._id,
      rating: faker.number.int({ min: 1, max: 5 })
    }));

    return {
      email: faker.internet.email(),
      password: "Password@123",
      role: faker.helpers.arrayElement(['admin', 'user']),
      isVerified: faker.datatype.boolean(),
      purchaseHistory: purchasedProducts,
      ratings: ratings,
      userDetail: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.middleName(),
        phoneNumber: faker.number.int({ min: 1, max: 10 }),
        address: faker.address.streetAddress(),
        gender: faker.name.gender()
      }
    };
  });

  await User.insertMany(users);
  console.log('Users seeded successfully');
};

const seedDatabase = async () => {
  await connectDb();
  await generateCategories();
  await generateProducts();
  await generateUsers();
};

seedDatabase().catch((error) => console.error('Error seeding database:', error));
