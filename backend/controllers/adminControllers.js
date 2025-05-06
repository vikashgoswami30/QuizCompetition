import User from '../models/User.js';
import Score from '../models/Score.js';

// Get all login users
export const getLoginUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all Round 1 Scores
export const getRound1Scores = async (req, res) => {
  try {
    const scores = await Score.find();
    res.status(200).json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a Login User
export const deleteLoginUser = async (req, res) => {
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
};

// Delete a Round 1 Score
export const deleteRound1Score = async (req, res) => {
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
};
