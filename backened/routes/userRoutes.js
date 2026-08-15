import express from 'express';
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'; // 👈 Add .js here
import { protect, admin } from '../middleware/authMiddleware.js'; // 👈 Add .js here

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;