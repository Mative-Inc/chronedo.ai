"use client";

import GenerativeSection from '@/components/dashboard/GenerativeSection';
import HeroSection from '@/components/dashboard/HeroSection';
import { CloudUpload, UploadIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        const userType = localStorage.getItem("type") || "visitor"; // Default to 'visitor' if no type is found
        const maxLimit = userType === "visitor" ? 3 : 5;

        let currentCount = parseInt(localStorage.getItem("count")) || 0;

        if (currentCount < maxLimit) {
            localStorage.setItem("count", currentCount + 1);
            console.log("local storage count", localStorage.getItem("count"));
        }
        else{
            const errorMessage = userType === "visitor"
                ? "You have reached the maximum limit of 3 images. Please login to continue."
                : "You have reached the maximum limit of 5 images. Please upgrade to PRO to continue.";
    
            setError(errorMessage);
            console.log("local storage count", localStorage.getItem("count"));
        }

    };

    return (
        <div className='flex flex-col w-full h-full gap-4'>
            <HeroSection />
            <GenerativeSection />
        </div>
    );
}
