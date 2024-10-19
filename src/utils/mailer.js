const nodemailer = require('nodemailer');
const axios = require('axios'); // Import Axios
require('dotenv').config(); // Ensure this is at the top to load .env variables

// Create a transporter object using Gmail as the SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Email User from .env
        pass: process.env.EMAIL_PASS, // App Password from Gmail
    },
    logger: true,  // Enables logging to see more details about the connection
    debug: true,   // Enables debugging output
});

// Function to send a verification email
exports.sendVerificationEmail = async (email, emailOtp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email for Storeflaunt',
        text: `Dear user,

        Please use the following OTP to verify your email address: ${emailOtp}. This OTP is valid for 15 minutes.

        Best regards,
        Harshada Team`,
    };

    try {
        // Logging environment variables to ensure they are loaded correctly
        console.log('Email User:', process.env.EMAIL_USER);  
        console.log('Email Pass:', process.env.EMAIL_PASS);

        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to: ${email}`);
    } catch (error) {
        console.error(`Error sending verification email: ${error.message}`);
        throw new Error('Could not send verification email'); // Rethrow the error for handling in controller
    }
};

// Function to send a verification SMS using Msg91
exports.sendVerificationSMS = async (phone, phoneOtp) => {
    try {
        const response = await axios.post('https://api.msg91.com/api/sendotp.php', null, {
            params: {
                authkey: process.env.MSG91_API_KEY,
                mobile: phone,
                template_id: '67139b0fd6fc05674b639be3', // Replace with your actual template ID
                otp_expiry: 1, // Set OTP expiry in minutes
                realTimeResponse: true, // Set to true for immediate response
                sender: 'Harshada1234', // Your Sender ID
            },
            data: {
                otp: phoneOtp, // Include phone OTP in the request body
            },
        });

        console.log('Response from Msg91:', response.data);

        // Check for success
        if (response.data && response.data.type === 'success') {
            console.log(`Verification SMS sent to: ${phone}`);
        } else {
            console.error(`Error sending SMS: ${response.data.message || 'Unknown error'}`);
            throw new Error('Could not send verification SMS');
        }
    } catch (error) {
        console.error(`Error sending verification SMS: ${error.message}`);
        if (error.response) {
            console.error('Error Response:', error.response.data); // Log the error response
        }
        throw new Error('Could not send verification SMS');
    }
};
