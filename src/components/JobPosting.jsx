import React, { useState } from 'react';
import Navbar from './Navbar';
import home from '../assests/home.png';
import { createJobPosting } from '../services/jobpostingService'; // Import the job posting service

const JobPosting = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experienceLevel: '',
    candidateEmail: '',
    endDate: '',
  });

  const fields = [
    {
      id: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      placeholder: 'Enter Job Title',
    },
    {
      id: 'jobDescription',
      label: 'Job Description',
      type: 'textarea', // Specify type as 'textarea'
      placeholder: 'Enter Job Description',
    },
    {
      id: 'experienceLevel',
      label: 'Experience Level',
      type: 'select',
      options: ['Junior', 'Mid', 'Senior'],
    },
    {
      id: 'candidateEmail',
      label: 'Add Candidate',
      type: 'email',
      placeholder: 'Enter Candidate Email',
    },
    {
      id: 'endDate',
      label: 'End Date',
      type: 'date',
      placeholder: 'Select End Date',
    },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJobPosting(formData); // Submit form data to the backend
      alert('Job posting created successfully!');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error creating job posting:', error);
      alert('Failed to create job posting');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex border-t border-[#C5C5C5] w-full h-screen'>
        <div className='border 2xl:p-5 xl:p-5 lg:p-5 pt-8 md:px-2 p-4 border-[#C5C5C5]'>
          <img
            src={home}
            className='2xl:w-[43px] xl:w-[43px] lg:w-[43px] md:w-[30px] w-[26px] 2xl:h-[43px] xl:h-[43px] lg:h-[43px] md:h-[30px] h-[26px]'
          />
        </div>

        <div className='w-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col '>
          {!showForm && (
            <div className='p-10'>
              <button
                className='bg-[#0B66EF] text-white font-semibold 2xl:text-[24px] xl:text-[24px] lg:text-[24px] text-[15px] text-center rounded-lg p-2 2xl:w-[310px] xl:w-[310px] lg:w-[310px] w-[150px]'
                onClick={() => setShowForm(true)}
              >
                Create Interview
              </button>
            </div>
          )}

          {showForm && (
            <div className='flex 2xl:w-[70%] xl:w-[70%] lg:w-[70%] w-full px-[30px]  justify-content-center mt-10 flex-col gap-3'>
              <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <div className='flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-10 my-5' key={field.id}>
                    <label className='w-full 2xl:text-[32px] xl:text-[32px] lg:text-[32px] text-[20px] text-right'>
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className='w-full text-gray-500 text-[20px] rounded-lg 2xl:p-4 xl:p-4 lg:p-4 p-2 border border-[#D0D0D0] focus:outline-[#0B66EF]'
                      >
                        <option value=''>Select {field.label}</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? ( // Handle textarea rendering
                      <textarea
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={4} // You can adjust the number of rows
                        className='w-full text-gray-500 text-[20px] rounded-lg 2xl:p-4 xl:p-4 lg:p-4 p-2 border border-[#D0D0D0] focus:outline-[#0B66EF]'
                      />
                    ) : (
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className='w-full text-gray-500 text-[20px] rounded-lg 2xl:p-4 xl:p-4 lg:p-4 p-2 border border-[#D0D0D0] focus:outline-[#0B66EF]'
                      />
                    )}
                  </div>
                ))}
                <div className='flex w-full justify-end'>
                  <button
                    type='submit'
                    className='bg-[#0B66EF] text-white font-semibold text-[20px] rounded-lg px-4 py-2 mt-5'
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className='w-[30%]'></div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
