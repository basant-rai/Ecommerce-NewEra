const mongoose = require('mongoose');
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

const dropDatabase = async () => {
  try {
    const db = mongoose.connection.db;
    await db.dropDatabase();
    console.log('Database dropped successfully');
  } catch (error) {
    console.error('Error dropping database:', error.message);
  }
};

const run = async () => {
  await connectDb();
  await dropDatabase();
  mongoose.disconnect();
};

run();
