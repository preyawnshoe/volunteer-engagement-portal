const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Use a referral link (increments referrer's shareCount)
router.post('/use', async (req, res) => {
  try {
    const { referralCode } = req.body;
    if (!referralCode) {
      return res.status(400).json({ message: 'Referral code is required.' });
    }
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(404).json({ message: 'Referrer not found.' });
    }
    referrer.shareCount += 1;
    await referrer.save();
    res.json({ message: 'Referral registered.', shareCount: referrer.shareCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 