const mongoose = require('mongoose');

const TraderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  winRate: { type: Number, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Trader', TraderSchema);
