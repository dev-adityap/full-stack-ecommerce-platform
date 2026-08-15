import Feedback from '../models/feedbackModel.js';

// @desc    Create new feedback / review
// @route   POST /api/feedback
// @access  Public
const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;

    if (!name || !email || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const feedback = new Feedback({
      name,
      email,
      rating,
      comment,
    });

    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all feedback entries
// @route   GET /api/feedback
// @access  Public / Admin
const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createFeedback, getFeedback };