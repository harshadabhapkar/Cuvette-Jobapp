// src/services/jobPostingService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Base URL for job posting API

// Function to create a new job posting
export const createJobPosting = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/api/job-postings/job-posting`, jobData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create job posting');
  }
};
