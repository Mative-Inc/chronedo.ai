import { ChevronDownIcon, SearchIcon, UserIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
    const {user} =useUser();

    return (
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center py-4">
            <div className="flex items-center gap-4 bg-[#217DFE0F] w-full max-w-[400px] p-2 rounded-md border border-[#0093E87D]">
                <SearchIcon className="w-6 h-6" />
                <input type="text" placeholder="Search" className="w-full p-1 rounded-md outline-none bg-transparent" />
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src="/star.png" alt="notification" className="w-8 h-8" />
                    <p className='text-xl font-bold'>53</p>
                </div>

                <div className='w-[1px] h-[30px] bg-gray-500'></div>

                <div className='flex items-center gap-2'>
                    <UserIcon className='w-6 h-6' />
                    <div className='flex flex-col text-white'>
                        <p className='text-xl font-bold'>{user?.name}</p>
                        <p className='text-sm text-gray-500'>{user?.email}</p>
                    </div>

                    <ChevronDownIcon className='w-4 h-4' />

                </div>

                
            </div>
        </div>
    );
};

export default Navbar;
