import React, { useState } from 'react';
import { CloudUpload, UploadIcon } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;



        const userType = localStorage.getItem("type") || "visitor"; // Default to 'visitor' if no type is found
        const maxLimit = userType === "visitor" ? 3 : 5;

        let currentCount = parseInt(localStorage.getItem("count")) || 0;

        if (currentCount < maxLimit) {
            localStorage.setItem("count", currentCount + 1);
            console.log("local storage count", localStorage.getItem("count"));
        }
        else {
            const errorMessage = userType === "visitor"
                ? "You have reached the maximum limit of 3 images. Please login to continue."
                : "You have reached the maximum limit of 5 images. Please upgrade to PRO to continue.";

            setError(errorMessage);
            console.log("local storage count", localStorage.getItem("count"));
        }


        setFile(URL.createObjectURL(selectedFile));
    };



    return (
        <div className="flex flex-col md:flex-row justify-between bg-[#217DFE0F] p-6 rounded-xl border border-[#0093E87D]">
            {/* Left Section */}
            <div className='flex flex-col w-full md:w-1/2 space-y-4 leading-wide'>
                <h1 className='text-xl sm:text-2xl md:text-4xl font-bold text-white'>
                    Transform Your Watch <br /> Photos with
                    <span className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold">
                        Chronedo.AI
                    </span>
                </h1>
                <p className='text-gray-500'>
                    Upload a watch photo & get a stunning <br /> background in seconds!
                </p>

                <select
                    className='max-w-[300px] p-2 rounded-md border border-[#2174FE]/10'
                    aria-label="Select an option"
                >
                    <option value="1" className='text-gray-500 bg-transparent'>Create a stunning background</option>
                    <option value="2" className='text-gray-500 bg-transparent'>Create a stunning background</option>
                    <option value="3" className='text-gray-500 bg-transparent'>Create a stunning background</option>
                </select>

                <div className="flex items-center gap-4">
                    <div>
                        <input
                            type='file'
                            id='file-upload'
                            className='hidden'
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                            aria-label="Upload a watch photo"
                        />

                        <label
                            htmlFor="file-upload"
                            className='cursor-pointer bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white px-4 py-2 rounded-full flex items-center gap-2'
                        >
                            Upload
                            <UploadIcon className='w-4 h-4' />
                        </label>
                    </div>

                    <Link href="/login">

                        Upgrade Pro

                    </Link>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Right Section */}
            <div className='flex flex-col max-h-[300px] h-auto px-10 w-full md:w-1/2 overflow-hidden'>
                {file ? (
                    <img src={file} alt="Uploaded watch" className='w-full h-full object-contain rounded-md border border-[#2174FE]/10' />
                ) : (
                    <div className='flex items-center justify-center w-full h-full text-gray-400'>
                        <CloudUpload className='w-full h-full' />

                    </div>
                )}
            </div>
        </div>
    )
}

export default HeroSection;
