const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trader = require('../models/Trader');

// Follow trader
router.post('/follow', async (req, res) => {
  const { userId, traderId } = req.body;
  try {
    const user = await User.findById(userId);
    const trader = await Trader.findById(traderId);
    if (!user || !trader) return res.status(404).json({ error: 'User or Trader not found' });

    user.followedTraders.push(traderId);
    trader.followers.push(userId);

    await user.save();
    await trader.save();

    res.status(200).json({ message: 'Followed trader successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
