import React, { useState } from 'react';
import { CloudUpload, DownloadIcon, UploadIcon } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { useImage } from '@/context/ImageContext'; // Import useImage

const HeroSection = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [savingImage, setSavingImage] = useState(false);
    const { user } = useUser();
    const { resultImage, setResultImage } = useImage(); // Use resultImage and setResultImage from ImageContext

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const userType = localStorage.getItem("type") || "visitor";
        const maxLimit = userType === "visitor" ? 3 : 95;
        let currentCount = parseInt(localStorage.getItem("count")) || 0;

        if (currentCount < maxLimit) {
            localStorage.setItem("count", currentCount + 1);
            await uploadToLightX(selectedFile);
            console.log("local storage count", localStorage.getItem("count"));
        } else {
            const errorMessage = userType === "visitor"
                ? "You have reached the maximum limit of 3 images. Please login to continue."
                : "You have reached the maximum limit of 5 images. Please upgrade to PRO to continue.";
            setError(errorMessage);
            console.log("local storage count", localStorage.getItem("count"));
        }

        setFile(URL.createObjectURL(selectedFile));
    };

    const uploadToLightX = async (file) => {
        setIsLoading(true);
        setIsError(false);

        try {
            const requestBody = {
                uploadType: "imageUrl",
                size: file.size,
                contentType: file.type,
            };

            const uploadResponse = await fetch(
                "https://api.lightxeditor.com/external/api/v2/uploadImageUrl",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.NEXT_PUBLIC_LIGHTX_API_KEY,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const uploadData = await uploadResponse.json();
            console.log("Upload response:", uploadData);

            if (uploadData.statusCode === 2000) {
                const { uploadImage, imageUrl } = uploadData.body;

                const putResponse = await fetch(uploadImage, {
                    method: "PUT",
                    headers: {
                        "Content-Type": file.type,
                    },
                    body: file,
                });

                if (!putResponse.ok) {
                    throw new Error(`Failed to upload image. Status: ${putResponse.status}`);
                }

                console.log("Image uploaded successfully:", putResponse.status);
                await generateAIBackground(imageUrl);
            } else {
                throw new Error("Failed to generate upload URL.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setIsError(true);
            setError("Failed to upload image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const generateAIBackground = async (imageUrl) => {
        try {
            console.log("Making request to generate AI background...");

            const response = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl }),
            });

            const data = await response.json();
            console.log("Response from AI background generation:", data);

            if (response.ok) {
                const { orderId } = data;
                await pollForResult(orderId);
            } else {
                throw new Error(data.message || "Failed to generate background.");
            }
        } catch (error) {
            console.error("Error generating background:", error);
            setIsError(true);
        }
    };

    const pollForResult = async (orderId) => {
        const pollInterval = 3000;
        const maxAttempts = 5;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const response = await fetch("/api/ai/poll", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ orderId }),
                });

                const data = await response.json();
                console.log("Polling response:", data);

                if (data.status === "active") {
                    console.log("Setting resultImage:", data.output); // Debugging
                    setResultImage(data.output); // Update resultImage in ImageContext
                    handleDBImage(data.output);
                    return;
                } else if (data.status === "failed") {
                    throw new Error("Background generation failed.");
                }
            } catch (error) {
                console.error("Error fetching result:", error);
            }

            await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }

        setIsError(true);
        setError("Background generation took too long. Please try again.");
    };

    const handleDBImage = async (output) => {
        try {
            console.log(user);
            setSavingImage(true);
            const res = await axios.post("/api/image", { userId: user.userId, imageUrl: output });
            console.log("Image saved:", res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setSavingImage(false);
        }
    };

    const handleDownload = () => {
        if (!resultImage) {
            console.error("No image to download.");
            return;
        }
        const link = document.createElement('a');
        link.href = resultImage;
        link.download = 'downloaded_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between bg-[#217DFE0F] p-6 gap-4 rounded-xl border border-[#0093E87D]">
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
                {isLoading && <p className="text-blue-500 text-sm">Processing image...</p>}
                {savingImage && <p className="text-blue-500 text-sm"> Saving image...</p>}
            </div>

            {/* Right Section */}
            <div className='flex flex-col max-h-[300px] h-auto px-10 w-full md:w-1/2 overflow-hidden'>
                {resultImage ? (
                    <div className="flex flex-col items-center  h-full">
                        <img src={resultImage} alt="Generated background" className='w-full h-full object-contain border border-[#2174FE]/10' />
                        <button onClick={handleDownload} className='mt-4 text-white cursor-pointer bg-gradient-to-r from-[#21ABFD] to-[#0055DE] px-4 py-2 rounded-full flex items-center gap-2'>
                            Download
                            <DownloadIcon className='w-4 h-4' />
                        </button>
                    </div>
                ) : file ? (
                    <img src={file} alt="Uploaded watch" className='w-full h-full object-contain rounded-md border border-[#2174FE]/10' />
                ) : (
                    <div className='flex items-center justify-center w-full h-full text-gray-400'>
                        <CloudUpload className='w-full h-full' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSection;