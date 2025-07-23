const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get top users by shareCount
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find({ userType: 'volunteer' })
      .sort({ shareCount: -1 })
      .limit(10)
      .select('name shareCount referralCode');
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 