import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import products from './data/products.js';

// Load environment variables
dotenv.config();

const importData = async () => {
  try {
    // 1. Wait for the database to connect FIRST
    await connectDB();

    // 2. Clear out any existing products
    await Product.deleteMany();

    // 3. Insert all products
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Run the function
importData();