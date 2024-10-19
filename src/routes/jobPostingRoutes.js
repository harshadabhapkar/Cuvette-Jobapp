// routes/jobPostingRoutes.js
const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/jobPostingController');

// Route to create a new job posting
router.post('/job-posting', jobPostingController.createJobPosting);

// Route to get all job postings
router.get('/job-postings', jobPostingController.getAllJobPostings);

module.exports = router;
