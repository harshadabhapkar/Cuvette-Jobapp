const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  companyName: { type: String },
  employeeSize: { type: Number },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  emailOtp: { type: String }, // Field to store email OTP
  phoneOtp: { type: String }, // Field to store phone OTP
  emailOtpExpiry: { type: Date }, // Field to store email OTP expiry time
  phoneOtpExpiry: { type: Date }, // Field to store phone OTP expiry time
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);
module.exports = User;
