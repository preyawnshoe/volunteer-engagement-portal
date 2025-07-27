const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['volunteer', 'ngo', 'admin'], default: 'volunteer' },
  referralCode: { type: String, unique: true },
  shareCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  
  // Volunteer profile fields
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  emergencyContact: { type: String },
  emergencyPhone: { type: String },
  skills: [{ type: String }],
  interests: [{ type: String }],
  availability: {
    weekdays: { type: Boolean, default: false },
    weekends: { type: Boolean, default: false },
    evenings: { type: Boolean, default: false },
    mornings: { type: Boolean, default: false }
  },
  experience: { type: String },
  motivation: { type: String },
  preferredActivities: [{ type: String }],
  timeCommitment: { type: String },
  profileCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema); 