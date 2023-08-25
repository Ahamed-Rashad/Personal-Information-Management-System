const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  age: Number,
  email: String,
  phoneNumber: String,
});

module.exports = mongoose.model('Record', recordSchema);
