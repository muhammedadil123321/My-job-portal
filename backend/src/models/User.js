const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'employer', 'admin'],
    required: true,
  },
  profileImage: {       
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
