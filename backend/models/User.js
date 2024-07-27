const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  email: { type: String },
  followedTraders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trader' }]
});

module.exports = mongoose.model('User', UserSchema);
