"use client";
import React, { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const HeroSection = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userType = localStorage.getItem("type") || "visitor"; // Default to 'visitor' if no type is found
    const maxLimit = userType === "visitor" ? 3 : 50;

    let currentCount = parseInt(localStorage.getItem("count")) || 0;

    if (currentCount < maxLimit) {
      localStorage.setItem("count", currentCount + 1);

      setImage(URL.createObjectURL(file));
      await uploadToLightX(file); // Trigger the upload

      console.log("local storage count", localStorage.getItem("count"));
    } else {
      console.log("error in handleFileChange");
      const errorMessage =
        userType === "visitor"
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

    try {
      // Step 1: Generate the upload URL
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

        // Step 2: Upload the image using the generated uploadImage URL
        const putResponse = await fetch(uploadImage, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file, // Directly use the file object
        });

        if (!putResponse.ok) {
          throw new Error(
            `Failed to upload image. Status: ${putResponse.status}`
          );
        }

        console.log("Image uploaded successfully:", putResponse.status);

        // Step 3: Remove the background
        await removeBackground(imageUrl); // Call the removeBackground function
      } else {
        throw new Error("Failed to generate upload URL.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsError(true);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeBackground = async (imageUrl) => {
    try {
      console.log("Making request to remove background...", imageUrl);
      const url =
        "https://api.lightxeditor.com/external/api/v1/remove-background";
      const apiKey = process.env.NEXT_PUBLIC_LIGHTX_API_KEY;
      console.log("API Key:", apiKey);

      const data = {
        imageUrl: imageUrl, // Use the imageUrl from the upload response
        background: "transparent background", // You can customize this (e.g., "transparent", "blue", "#FFFFFF")
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(data),
      });

      console.log("Remove Background Response:", response);

      if (!response.ok) {
        throw new Error(
          `Failed to remove background. Status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Remove Background Response:", result);

      if (result.statusCode === 2000) {
        const { orderId } = result.body;
        await pollForBackgroundRemovalResult(orderId); // Poll for the result
      } else {
        throw new Error("Failed to initiate background removal.");
      }
    } catch (error) {
      console.error("Error removing background:", error);
      setIsError(true);
      setErrorMessage("Failed to remove background. Please try again.");
    }
  };

  const pollForBackgroundRemovalResult = async (orderId) => {
    const pollInterval = 3000; // Poll every 3 seconds
    const maxAttempts = 5; // Maximum number of retries

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const url = "https://api.lightxeditor.com/external/api/v1/order-status";
        const apiKey = process.env.NEXT_PUBLIC_LIGHTX_API_KEY;

        const payload = {
          orderId: orderId,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to check status. Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Polling Response:", result);

        if (result.statusCode === 2000) {
          const { status, output } = result.body;

          if (status === "active") {
            setResultImage(output); // Set the result image URL
            return;
          } else if (status === "failed") {
            throw new Error("Background removal failed.");
          }
        }
      } catch (error) {
        console.error("Error polling for result:", error);
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    throw new Error(
      "Max polling attempts reached. Background removal timed out."
    );
  };

  const generateAIBackground = async (maskedImageUrl) => {
    try {
      console.log("Making request to generate AI background...");

      // Prepare the payload
      const payload = {
        imageUrl: maskedImageUrl,
        textPrompt: "Luxury Clean background with white waves",
      };

      // Add styleImageUrl if required
      if (process.env.NEXT_PUBLIC_LIGHTX_STYLE_IMAGE_URL) {
        payload.styleImageUrl = process.env.NEXT_PUBLIC_LIGHTX_STYLE_IMAGE_URL;
      }

      console.log("Request payload:", payload);

      // Make the API request
      const response = await fetch(
        "https://api.lightxeditor.com/external/api/v1/product-photoshoot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_LIGHTX_API_KEY,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Response from AI background generation:", data);

      if (data.statusCode === 2000) {
        const { orderId } = data.body;
        await pollForResult(orderId); // Poll for the result
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
        const resultResponse = await fetch(
          `https://api.lightxeditor.com/external/api/v1/getResult/${orderId}`,
          {
            method: "GET",
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_LIGHTX_API_KEY,
            },
          }
        );

        const resultData = await resultResponse.json();
        console.log("Polling response:", resultData);

        if (
          resultData.statusCode === 2000 &&
          resultData.body.status === "completed"
        ) {
          setResultImage(resultData.body.resultImageUrl); // Set the result image URL
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
        <div className="flex flex-col items-center justify-center gap-1 text-white relative">
          <h1 className="text-2xl sm:text-[35px] md:text-[65px]  font-semibold">Transform Your Watch</h1>
          <h1 className="text-2xl sm:text-[35px] md:text-[65px] font-semibold">
            Photos with{" "}
            <span className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold">
              Chronedo.AI
            </span>
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
            className="flex items-center gap-2 sm:text-lg text-sm text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
          >
            Upload Image
            <ArrowUpCircleIcon className="w-4 h-4" />
          </label>

          <p className="text-gray-400 text-normal sm:text-lg mt-4">or drag a file</p>

          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Uploaded Preview"
                className="max-w-full max-h-60 rounded-md shadow-lg"
              />
            </div>
          )}

          {uploadData && (
            <div className="mt-4">
              <img
                src={uploadData.body.imageUrl}
                alt="Uploaded Preview"
                className="max-w-full max-h-60 rounded-md shadow-lg"
              />
            </div>
          )}

          {/* Result Section */}
          {isLoading && <p className="text-blue-500 mt-4">Processing...</p>}
          {isError && (
            <p className="text-red-500 mt-4">
              Error processing image. Try again.
            </p>
          )}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          {resultImage && (
            <div className="mt-4">
              <h3 className="text-white mb-2">Background Removed:</h3>
              <img
                src={resultImage}
                alt="Background Removed"
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
