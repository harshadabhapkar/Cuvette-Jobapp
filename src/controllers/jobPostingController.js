// controllers/jobPostingController.js
const JobPosting = require('../models/JobPosting');

// @desc    Create a new job posting
// @route   POST /api/job-posting
// @access  Public
exports.createJobPosting = async (req, res) => {
  try {
    const { jobTitle, jobDescription, experienceLevel, candidateEmail, endDate } = req.body;

    // Create a new job posting
    const newJobPosting = new JobPosting({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidateEmail,
      endDate,
    });

    await newJobPosting.save();

    return res.status(201).json({
      success: true,
      message: 'Job posting created successfully!',
      jobPosting: newJobPosting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not create the job posting.',
      error: error.message,
    });
  }
};

// @desc    Get all job postings
// @route   GET /api/job-postings
// @access  Public
exports.getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    return res.status(200).json({
      success: true,
      jobPostings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch job postings.',
      error: error.message,
    });
  }
};
