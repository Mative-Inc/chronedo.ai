"use client";
import React, { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const HeroSection = () => {
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-center px-4 pb-[100px] pt-[200px]">


            {/* Layer Image - Positioned Below Content */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/layer.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Blur Effect */}

            <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-end items-center pointer-events-none">
                <div
                    className="w-[500px] h-[400px] rounded-full bg-[#2176FE14] blur-[150px]"
                ></div>
            </div>



            <div className="relative flex flex-col items-center justify-center max-w-[1200px] mx-auto">
                {/* Content Section */}
                <div className="flex flex-col items-center justify-center text-white relative">
                    <h1 className="text-[65px] font-semibold">Transform Your Watch</h1>
                    <h1 className="text-[65px] font-semibold -mt-4">
                        Photos with <span className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold">Chronedo.AI</span>
                    </h1>
                </div>

                <p className="text-center mt-4 relative z-10">
                    Upload a watch photo & get a stunning <br /> background in seconds!
                </p>

                {/* Image Upload Area */}
                <div
                    className="flex flex-col items-center justify-center mt-4 px-2 py-6 border-2 border-[#0093E8] bg-[#0D0B13] rounded-[20px] w-full max-w-[270px] relative z-10"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file-upload"
                        className=" flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
                    >
                        Upload Image
                        <ArrowUpCircleIcon className="w-4 h-4" />
                    </label>

                    <p className="text-gray-400 text-lg mt-4">or drag a file</p>

                    {image && (
                        <div className="mt-4">
                            <img
                                src={image}
                                alt="Uploaded Preview"
                                className="max-w-full max-h-60 rounded-md shadow-lg"
                            />
                        </div>
                    )}
                </div>

            </div>




        </div>
    );
};

export default HeroSection;
