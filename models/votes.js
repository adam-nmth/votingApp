/* MONGOOSE SETUP */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Vote = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userInfo' },
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'polls' },
  vote: Boolean,
});

module.exports = mongoose.model('votes', Vote);
