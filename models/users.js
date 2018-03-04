/* MONGOOSE SETUP */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  payload: String
});

module.exports = mongoose.model('userInfo', UserDetail);
