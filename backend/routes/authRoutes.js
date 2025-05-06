
import express from 'express';
import bcrypt from 'bcryptjs';
import Score from '../models/Score.js';
import User from '../models/User.js';

const router = express.Router();

// Submit Score Route
router.post('/submit', async (req, res) => {
  const { teamName, score, email } = req.body;

  if (!teamName || score === undefined || !email) {
    return res.status(400).json({ message: 'Team Name, Score, and Email are required' });
  }

  try {
    const existingSubmission = await Score.findOne({ email });

    if (existingSubmission) {
      return res.status(400).json({ message: 'Already submitted for Round 1' });
    }

    const newScore = new Score({ teamName, score, email });
    await newScore.save();

    console.log("Received:", req.body);
    res.status(201).json({ message: 'Score submitted successfully' });

  } catch (error) {
    console.error('Error while submitting score:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leaderboard Route
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Score.find({}).sort({ score: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard data' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { teamName, firstMember, secondMember, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      teamName,
      firstMember,
      secondMember,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      teamName: user.teamName,
      email: user.email
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ New Route to Check if Email Exists in Score Collection
router.get('/score/check/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const exists = await Score.findOne({ email });

    res.status(200).json({ exists: !!exists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all login users (For Admin Panel)
router.get('/login-users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all Round 1 Scores (For Admin Panel)
router.get('/round1-scores', async (req, res) => {
  try {
    const scores = await Score.find();
    res.status(200).json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a login user (For Admin Panel)
router.delete('/login-users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a Round 1 score (For Admin Panel)
router.delete('/round1-scores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const score = await Score.findByIdAndDelete(id);
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }
    res.status(200).json({ message: 'Score deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
