import React from 'react';
import { useLocation } from 'react-router-dom';
import Cuvette from "../assests/Cuvette.png";
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ token }) => {
    const location = useLocation();
    let userName = "Your Name"; // Default name if no token

    // Decode token to get user information
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userName = decodedToken?.name || "Your Name"; // Adjust based on your token structure
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    return (
        <div className="navbar-main-container">
            <div className="w-full navbar-sub-container">
                <div className='justify-between flex w-full mt-5'>
                    <img 
                        src={Cuvette} 
                        className='top-[47px] left-[55px] 2xl:w-[165px] xl:w-[165px] lg:w-[165px] md:w-[100px] w-[80px] 2xl:h-[43px] xl:h-[43px] lg:h-[43px]  h-[30px]' 
                        alt="Cuvette Logo"
                    />
                   
                        <p className='flex gap-2 text-[#576474] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] text-[20px] font-DM Sans'>
                            Contact
                            {location.pathname === '/create-interview' && (
                            <span className='border border-[#83909F] p-2 rounded-lg text-[20px] flex gap-2'>
                                <span className='px-4 rounded-full bg-[#83909F]'></span> {userName}
                            </span>
                            )}
                        </p>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;
