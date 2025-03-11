import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/24/outline";
import React from "react";

const Footer = () => {
    return (
        <div className="flex flex-col w-full text-sm py-4 rounded-full">
            <div className="w-full h-[1px] bg-gray-700"></div>
            <div className="flex max-w-[1200px] w-full justify-between flex-wrap mx-auto py-10 gap-4">


                {/* column 1 */}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <img src="/logo.png" alt="logo" className="w-30 h-10" />
                        <p className="text-white text-sm">© 2025 Watch Background Generator. All rights reserved.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-white text-sm">Join our newsletter</p>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Enter your email" className="w-full p-2 rounded-md bg-transparent border border-gray-700 outline-none" />
                            <button className="bg-[#21ACFD] text-white px-4 py-2 rounded-md hover:bg-[#2174FE] cursor-pointer">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* column 2 */}

                <div className="flex flex-col gap-4">
                    <h1 className="text-white text-sm">Quick Links</h1>
                    <p className=" text-sm hover:text-white">Pages</p>
                    <p className=" text-sm hover:text-white">Home</p>
                    <p className=" text-sm hover:text-white">About</p>
                    <p className=" text-sm hover:text-white">Contact</p>
                </div>

                {/* column 3 */}

                <div className="flex flex-col gap-4">
                    <h1 className="text-white text-sm">Services</h1>
                    <p className=" text-sm hover:text-white">Watch Background Generator</p>
                    <p className=" text-sm hover:text-white">Watch Background Generator</p>
                    <p className=" text-sm hover:text-white">Watch Background Generator</p>
                </div>

                {/* column 4 */}

                <div className="flex flex-col gap-4">
                    <h1 className="text-white text-sm">Contact</h1>
                    <p className=" text-sm hover:text-white flex items-center gap-2"><MapIcon className="w-4 h-4 text-[#21ACFD]" /> lahore,pakistan</p>
                    <p className=" text-sm hover:text-white flex items-center gap-2"><EnvelopeIcon className="w-4 h-4 text-[#21ACFD]" /> isla.dev@gmail.com</p>
                    <p className=" text-sm hover:text-white flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-[#21ACFD]" /> +91 9876543210</p>
                </div>

            </div>
        </div>
    );
};

export default Footer;
