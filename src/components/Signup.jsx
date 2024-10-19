import React, { useState } from 'react';
import Navbar from './Navbar';
import { GoPerson } from 'react-icons/go';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import groups from '../assests/groups.png';
import { FaCircleCheck } from 'react-icons/fa6';
import { registerUser, verifyEmail, verifyPhone } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const inputFields = [
        { id: 'name', placeholder: 'Name', icon: <GoPerson className='mt-3 text-[25px]' /> },
        { id: 'phone', placeholder: 'Phone Number', icon: <BsTelephone className='mt-3 text-[25px]' /> },
        { id: 'companyName', placeholder: 'Company Name', icon: <GoPerson className='mt-3 text-[25px]' /> },
        { id: 'email', placeholder: 'Company Email', icon: <AiOutlineMail className='mt-3 text-[25px]' /> },
        { id: 'employeeSize', placeholder: 'Employee Size', icon: <img src={groups} className='mt-3 h-[32px] w-[32px]' /> },
    ];

    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        companyName: '',
        email: '',
        employeeSize: ''
    });
    const [showVerification, setShowVerification] = useState(false);
    const [isVerified, setIsVerified] = useState({ email: false, phone: false });
    const [otpInput, setOtpInput] = useState({ email: '', phone: '' }); // New state for OTP inputs

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOtpChange = (e) => {
        const { name, value } = e.target;
        setOtpInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleProceedClick = async () => {
        if (!formData.name || !formData.phone || !formData.companyName || !formData.email || !formData.employeeSize) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await registerUser(formData);
            alert(response.msg);
            setShowVerification(true); // Show verification fields
        } catch (error) {
            alert(error?.response?.data?.msg);
        }
    };

    const handleVerifyEmail = async () => {
        const otp = otpInput.email;
        if (!otp) {
            alert('Please enter the OTP for Email.');
            return;
        }

        try {
            const verifyResponse = await verifyEmail(formData.email, otp);
            alert(verifyResponse.msg);

            if (verifyResponse?.token) {
                setToken(verifyResponse.token);
                setIsVerified((prev) => ({ ...prev, email: true }));
                setTimeout(() => {
                    setOtpInput((prev) => ({ ...prev, email: '' })); // Reset OTP input field
                    if (isVerified.phone) navigate('/create-interview'); // Navigate only if both are verified
                }, 2000);
            }
        } catch (error) {
            alert(error?.response?.data?.msg || 'An unexpected error occurred. Please try again.');
        }
    };

    const handleVerifyPhone = async () => {
        const otp = otpInput.phone;
        if (!otp) {
            alert('Please enter the OTP for Phone.');
            return;
        }

        try {
            const verifyResponse = await verifyPhone(formData.phone, otp);
            alert(verifyResponse.msg);

            if (verifyResponse?.token) {
                setToken(verifyResponse.token);
                setIsVerified((prev) => ({ ...prev, phone: true }));
                setTimeout(() => {
                    setOtpInput((prev) => ({ ...prev, phone: '' })); // Reset OTP input field
                    if (isVerified.email) navigate('/create-interview'); // Navigate only if both are verified
                }, 2000);
            }
        } catch (error) {
            alert(error?.response?.data?.msg || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className='overflow-hidden'>
            <Navbar  token={token} />
            <div className="main-container">
                <div className="w-full sub-container">
                    <div className='flex justify-between 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-10 w-full mt-10'>
                        <p className='font-semibold 2xl:w-[600px] xl:w-[600px] lg:w-[600px] w-full 2xl:text-[22.24px] xl:text-[22.24px] lg:text-[22.24px] text-[20px] 2xl:mt-60 xl:mt-60 lg:mt-60 mt-20' style={{ color: "rgba(41, 41, 41, 0.7)" }}>Lorem Ipsm is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
                        <div className='flex flex-col border border-[#0B66EF] p-6 2xl:w-[619px] xl:w-[619px] lg:w-[619px] w-full rounded-lg'>
                            <p className='text-center font-semibold text-black text-[24px]'>Sign Up</p>
                            <p className='text-[16px] font-DM Sans text-center font-lg' style={{ color: "rgba(41, 41, 41, 0.7)" }}>Lorem Ipsum is simply dummy text</p>

                            {!showVerification && (
                                <>
                                    <div className='mt-5'>
                                        {inputFields.map((field) => (
                                            <div key={field.id} className='bg-[#F4F4F4] border border-[#CCCCCC] px-4 mx-5 text-[#535353] flex gap-1 rounded-lg my-7'>
                                                {field.icon}
                                                <input
                                                    id={field.id}
                                                    name={field.id}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id]} 
                                                    onChange={handleChange} 
                                                    className='w-full focus:outline-none bg-[#F4F4F4] text-[20px] text-[#535353] p-2 border-none'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className='text-[16px] font-DM Sans font-semibold text-center' style={{ color: "rgba(41, 41, 41, 0.7)" }}>By clicking on proceed you will accept our</p>
                                    <p className='text-[16px] font-DM Sans font-semibold justify-center flex text-blue-400 w-full'>Terms<span style={{ color: "rgba(41, 41, 41, 0.7)" }}>&</span> Conditions</p>

                                    <button onClick={handleProceedClick} className='bg-[#0B66EF] text-white font-semibold 2xl:text-[24px] xl:text-[24px] lg:text-[24px] text-[20px] text-center rounded-lg p-1 mx-5 mt-4 mb-2'>Proceed</button>
                                </>
                            )}

                            {showVerification && (
                                <>
                                    <div className='bg-[#F4F4F4] border border-[#CCCCCC] px-4 mx-5 text-[#535353] flex gap-1 rounded-lg my-5'>
                                        <AiOutlineMail className='mt-3 text-[25px]' />
                                        <input
                                            name="email"
                                            placeholder="Enter OTP for Email"
                                            value={otpInput.email} 
                                            onChange={handleOtpChange} 
                                            className='w-full focus:outline-none bg-[#F4F4F4] text-[20px] text-[#535353] p-2 border-none'
                                        />
                                        {isVerified.email && <FaCircleCheck className='text-green-500 text-[24px] mt-2' />}
                                    </div>
                                    <button onClick={handleVerifyEmail} className='bg-[#0B66EF] text-white font-semibold text-[20px] text-center rounded-lg p-1 mx-5 mb-2'>Verify Email</button>
                                    

                                    <div className='bg-[#F4F4F4] border border-[#CCCCCC] px-4 mx-5 text-[#535353] flex gap-1 rounded-lg my-5'>
                                        <BsTelephone className='mt-3 text-[25px]' />
                                        <input
                                            name="phone"
                                            placeholder="Enter OTP for Phone"
                                            value={otpInput.phone} 
                                            onChange={handleOtpChange} 
                                            className='w-full focus:outline-none bg-[#F4F4F4] text-[20px] text-[#535353] p-2 border-none'
                                        />
                                        {isVerified.phone && <FaCircleCheck className='text-green-500 text-[24px] mt-2' />}
                                    </div>
                                    <button onClick={handleVerifyPhone} className='bg-[#0B66EF] text-white font-semibold text-[20px] text-center rounded-lg p-1 mx-5 mb-2'>Verify Phone</button>
                                    
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
