import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';

dotenv.config();

const promoteUser = async () => {
  try {
    await connectDB();
    
    // Finds your account and updates the isAdmin flag to true
    // Make sure the email below exactly matches the one you used to register!
    const user = await User.findOneAndUpdate(
      { email: 'adityapanna009@gmail.com' }, 
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`🎉 Success! ${user.name} is now an Admin!`);
    } else {
      console.log('⚠️ User not found. Please check that the email matches exactly.');
    }
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

promoteUser();