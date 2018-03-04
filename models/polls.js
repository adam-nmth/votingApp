/* MONGOOSE SETUP */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Poll = new Schema({
  question: String,
  yesCount: Number,
  noCount: Number,
  public_url: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userInfo' }
});

module.exports = mongoose.model('polls', Poll);
