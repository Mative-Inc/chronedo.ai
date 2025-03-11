import { ChevronDownIcon, SearchIcon, UserIcon } from 'lucide-react';
import React from 'react';

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4 bg-[#217DFE0F] p-2 rounded-md border border-[#2174FE]/10">
                <SearchIcon className="w-6 h-6" />
                <input type="text" placeholder="Search" className="w-full p-2 rounded-md outline-none bg-transparent" />
            </div>

            <div className="flex items-center gap-4">
                <p>53</p>
                <div className="w-[1px] h-[20px] bg-gray-500"></div>

                <div className='flex items-center gap-2'>
                    <UserIcon className='w-6 h-6' />
                    <div className='flex flex-col'>
                        <p>John Doe</p>
                        <p>john.doe@example.com</p>
                    </div>

                    <ChevronDownIcon className='w-4 h-4' />

                </div>
            </div>
        </div>
    );
};

export default Navbar;
