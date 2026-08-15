import express from 'express';
import { createFeedback, getFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.route('/').post(createFeedback).get(getFeedback);

export default router;