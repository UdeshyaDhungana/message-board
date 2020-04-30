const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  membership: {type: Boolean, required: true},
});

module.exports = mongoose.model('User', userSchema);