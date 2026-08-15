import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no two users can register with the same email
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // By default, new users are normal customers, not admins
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt dates
  }
);

// This custom method compares the plain-text password a user types during login
// to the encrypted password saved in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// This "Pre-Save" middleware automatically encrypts the password 
// right before saving it to MongoDB for the very first time.
userSchema.pre('save', async function (next) {
  // If the password wasn't modified, skip encryption
  if (!this.isModified('password')) {
    next();
  }

  // Generate a random "salt" and encrypt the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;