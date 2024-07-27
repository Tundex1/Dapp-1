const express = require('express');
const router = express.Router();
const Trader = require('../models/Trader');

// Register trader
router.post('/register', async (req, res) => {
  const { name, walletAddress, winRate } = req.body;
  try {
    const newTrader = new Trader({ name, walletAddress, winRate });
    await newTrader.save();
    res.status(201).json(newTrader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
