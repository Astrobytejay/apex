// server/models/schema/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  role: { type: String, default: 'user' },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }], // If you have roles
  createdDate: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
