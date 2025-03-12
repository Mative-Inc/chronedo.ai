// "use client";
// import React, { useState } from "react";
// import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

// const HeroSection = () => {
//     const [image, setImage] = useState(null);

//     const [isLoading, setIsLoading] = useState(false);
//     const [isError, setIsError] = useState(false);
//     const [data, setData] = useState(null);

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         setIsLoading(true);
//         if (file) {
//             setImage(URL.createObjectURL(file));
//             const res =await axios.post('/api/upload', {
//         }
//         setIsLoading(false);
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         const file = e.dataTransfer.files[0];
//         if (file) {
//             setImage(URL.createObjectURL(file));
//         }
//     };

//     return (
//         <div className="relative w-full flex flex-col items-center justify-center px-4 pb-[100px] pt-[200px]">


//             {/* Layer Image - Positioned Below Content */}
//             <div className="absolute inset-0 z-0">
//                 <img
//                     src="/layer.png"
//                     alt="Hero Background"
//                     className="w-full h-full object-cover"
//                 />
//             </div>

//             {/* Blur Effect */}

//             <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-end items-center pointer-events-none">
//                 <div
//                     className="w-[500px] h-[400px] rounded-full bg-[#2176FE14] blur-[150px]"
//                 ></div>
//             </div>



//             <div className="relative flex flex-col items-center justify-center max-w-[1200px] mx-auto">
//                 {/* Content Section */}
//                 <div className="flex flex-col items-center justify-center text-white relative">
//                     <h1 className="text-[65px] font-semibold">Transform Your Watch</h1>
//                     <h1 className="text-[65px] font-semibold -mt-4">
//                         Photos with <span className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold">Chronedo.AI</span>
//                     </h1>
//                 </div>

//                 <p className="text-center mt-4 relative z-10">
//                     Upload a watch photo & get a stunning <br /> background in seconds!
//                 </p>

//                 {/* Image Upload Area */}
//                 <div
//                     className="flex flex-col items-center justify-center mt-4 px-2 py-6 border-2 border-[#0093E8] bg-[#0D0B13] rounded-[20px] w-full max-w-[270px] relative z-10"
//                     onDrop={handleDrop}
//                     onDragOver={(e) => e.preventDefault()}
//                 >
//                     <input
//                         id="file-upload"
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleFileChange}
//                     />
//                     <label
//                         htmlFor="file-upload"
//                         className=" flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
//                     >
//                         Upload Image
//                         <ArrowUpCircleIcon className="w-4 h-4" />
//                     </label>

//                     <p className="text-gray-400 text-lg mt-4">or drag a file</p>

//                     {image && (
//                         <div className="mt-4">
//                             <img
//                                 src={image}
//                                 alt="Uploaded Preview"
//                                 className="max-w-full max-h-60 rounded-md shadow-lg"
//                             />
//                         </div>
//                     )}
//                 </div>

//             </div>




//         </div>
//     );
// };

// export default HeroSection;


"use client";
import React, { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const HeroSection = () => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    
    

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const userType = localStorage.getItem("type") || "visitor"; // Default to 'visitor' if no type is found
        const maxLimit = userType === "visitor" ? 3 : 5;
    
        let currentCount = parseInt(localStorage.getItem("count")) || 0;
    
        if (currentCount < maxLimit) {
            localStorage.setItem("count", currentCount + 1);
    
            setImage(URL.createObjectURL(file));
            // await uploadToLightX(file); // Trigger the upload
    
            console.log("local storage count", localStorage.getItem("count"));
        } else {
            const errorMessage = userType === "visitor"
                ? "You have reached the maximum limit of 3 images. Please login to continue."
                : "You have reached the maximum limit of 5 images. Please upgrade to PRO to continue.";
    
            setErrorMessage(errorMessage);
            console.log("local storage count", localStorage.getItem("count"));
        }
    };
    

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            await uploadToLightX(file); // Trigger the upload
        }
    };

    const uploadToLightX = async (file) => {
        setIsLoading(true);
        setIsError(false);

        // Prepare FormData for the upload
        const formData = new FormData();
        formData.append("uploadType", "imageUrl");
        formData.append("size", file.size);
        formData.append("contentType", file.type);

        try {
            const uploadResponse = await fetch("https://api.lightxeditor.com/external/api/v2/uploadImageUrl", {
                method: "POST",
                headers: {
                    "x-api-key": "your-api-key-here",
                },
                body: formData,
            });

            const uploadData = await uploadResponse.json();
            if (uploadData.statusCode === 2000) {
                const { maskedImageUrl } = uploadData.body;
                await generateAIBackground(maskedImageUrl);
            } else {
                throw new Error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const generateAIBackground = async (maskedImageUrl) => {
        try {
            const response = await fetch("https://api.lightxeditor.com/external/api/v1/product-photoshoot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "your-api-key-here",
                },
                body: JSON.stringify({
                    imageUrl: maskedImageUrl,
                    textPrompt: "Luxury Clean background with white waves",
                }),
            });

            const data = await response.json();
            if (data.statusCode === 2000) {
                const { orderId } = data.body;

                // Polling logic to fetch the generated image
                await pollForResult(orderId);
            } else {
                throw new Error("Failed to generate background.");
            }
        } catch (error) {
            console.error("Error generating background:", error);
            setIsError(true);
        }
    };

    const pollForResult = async (orderId) => {
        const pollInterval = 3000; // Poll every 3 seconds
        const maxAttempts = 10;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const resultResponse = await fetch(`https://api.lightxeditor.com/external/api/v1/getResult/${orderId}`, {
                    method: "GET",
                    headers: {
                        "x-api-key": "your-api-key-here",
                    },
                });

                const resultData = await resultResponse.json();
                if (resultData.statusCode === 2000 && resultData.body.status === "completed") {
                    setResultImage(resultData.body.resultImageUrl);
                    return;
                }
            } catch (error) {
                console.error("Error fetching result:", error);
            }
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }

        setIsError(true); // Show error if max attempts exceeded
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
                <div className="w-[500px] h-[400px] rounded-full bg-[#2176FE14] blur-[150px]"></div>
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
                        className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
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

                    {/* Result Section */}
                    {isLoading && <p className="text-blue-500 mt-4">Processing...</p>}
                    {isError && <p className="text-red-500 mt-4">Error processing image. Try again.</p>}
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                    {resultImage && (
                        <div className="mt-4">
                            <h3 className="text-white mb-2">Generated Background:</h3>
                            <img
                                src={resultImage}
                                alt="Generated Background"
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
