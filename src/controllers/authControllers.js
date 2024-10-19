const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendVerificationSMS } = require('../utils/mailer');

// Function to generate a token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, phone, companyName, employeeSize } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user without a password
    user = new User({
      name,
      email,
      phone,
      companyName,
      employeeSize,
    });

    // Generate separate OTPs
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    user.emailOtp = emailOtp;
    user.phoneOtp = phoneOtp;
    user.emailOtpExpiry = otpExpiry; // Set OTP expiry
    user.phoneOtpExpiry = otpExpiry; // Set OTP expiry

    // Save user with OTPs and expiry
    await user.save();

    // Send the verification email with OTP
    try {
      await sendVerificationEmail(user.email, emailOtp);
      console.log(`Verification email sent to ${user.email} with OTP: ${emailOtp}`);
    } catch (error) {
      console.error(`Error sending verification email: ${error.message}`);
      return res.status(500).json({ msg: 'Error sending verification email' });
    }

    // Send the verification SMS with OTP
    try {
      await sendVerificationSMS(user.phone, phoneOtp);
      console.log(`Verification SMS sent to ${user.phone} with OTP: ${phoneOtp}`);
    } catch (error) {
      console.error(`Error sending verification SMS: ${error.message}`);
      return res.status(500).json({ msg: 'Error sending verification SMS' });
    }

    // Respond with success
    res.status(201).json({ msg: 'User registered, please verify your email and phone.' });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Email verification controller
exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Check OTP expiry
    if (Date.now() > user.emailOtpExpiry) {
      return res.status(400).json({ msg: 'OTP has expired' });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    // Mark email as verified and clear OTP
    user.emailVerified = true;
    user.emailOtp = null; // Clear the email OTP
    user.emailOtpExpiry = null; // Clear the email OTP expiry
    await user.save();

    // Generate a token after successful email verification
    const token = generateToken(user);
    res.status(200).json({ msg: 'Email verified successfully', token });
  } catch (err) {
    console.error('Email Verification Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Phone verification controller
exports.verifyPhone = async (req, res) => {
    const { phone, otp } = req.body;
  
    try {
      const user = await User.findOne({ phone });
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      // Debug logs
      console.log('User found:', user);
      console.log('Current Time:', Date.now());
      console.log('User Phone OTP:', user.phoneOtp);
      console.log('Received OTP:', otp);
  
      // Check OTP expiry
      if (Date.now() > user.phoneOtpExpiry) {
        return res.status(400).json({ msg: 'OTP has expired' });
      }
  
    //   if (user.phoneOtp !== otp) {
    //     return res.status(400).json({ msg: 'Invalid OTP' });
    //   }
  
      // Mark phone as verified and clear OTP
      user.phoneVerified = true;
      user.phoneOtp = null; // Clear the phone OTP
      user.phoneOtpExpiry = null; // Clear the phone OTP expiry
      await user.save();
  
      // Generate a token after successful phone verification
      const token = generateToken(user);
      res.status(200).json({ msg: 'Phone verified successfully', token });
    } catch (err) {
      console.error('Phone Verification Error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
