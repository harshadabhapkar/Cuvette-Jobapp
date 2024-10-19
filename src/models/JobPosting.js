// models/JobPosting.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobPostingSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'], // Options for experience levels
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JobPosting', JobPostingSchema);
