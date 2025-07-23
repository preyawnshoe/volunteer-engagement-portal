const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Helper to generate a unique referral code
function generateReferralCode(name) {
  return (
    name.replace(/\s+/g, '').toLowerCase() + Math.random().toString(36).substring(2, 8)
  );
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, userType, referralCode } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newReferralCode = generateReferralCode(name);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      userType: userType || 'volunteer',
      referralCode: newReferralCode,
    });
    await user.save();
    // Increment referrer's shareCount if referralCode is provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      console.log('Referral attempt:', referralCode, referrer ? referrer.email : 'NOT FOUND');
      if (referrer) {
        referrer.shareCount += 1;
        await referrer.save();
        console.log('Referrer updated:', referrer.email, referrer.shareCount);
      }
    }
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      { userId: user._id, userType: user.userType, referralCode: user.referralCode },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { name: user.name, email: user.email, userType: user.userType, referralCode: user.referralCode, shareCount: user.shareCount } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 