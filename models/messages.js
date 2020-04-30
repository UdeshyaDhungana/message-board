const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let messageSchema = new Schema({
  msg: {type:String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Message', messageSchema);