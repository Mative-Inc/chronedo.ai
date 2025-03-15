"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";



const faqData = [
    {
        id: 1,
        question: "What is this product?",
        answer: "This is a product that is used to help people with their problems.",
    },
    {
        id: 2,
        question: "What is this product?",
        answer: "This is a product that is used to help people with their problems.",
    },
    {
        id: 3,
        question: "What is this product?",
        answer: "This is a product that is used to help people with their problems.",
    },
];


const FAQSection = () => {
    const [active, setActive] = useState(null);

    const handleClick = (id) => {
        setActive(active === id ? null : id);
    };

    return <div className="flex flex-col w-full max-w-[1200px] mx-auto items-center gap-10 py-[100px]">
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-white text-4xl font-normal">FAQ's</h1>
            <p className="text-gray-400 text-sm">People often ask these questions</p>
        </div>


        <div className="flex flex-col gap-4 px-4 w-full">
            {faqData.map((faq) => (
                <div key={faq.id} className={`flex items-center  gap-4 border border-[#0093E87D] bg-[#217DFE08] backdrop-blur-[70px] rounded-[20px] p-4 ${active === faq.id ? "border-[#21ADFD] bg-[#217DFE21]" : ""}`}>
                    <div onClick={() => handleClick(faq.id)} className={`flex items-center gap-2 w-10 h-10 bg-gray-800 rounded-lg justify-center items-center cursor-pointer ${active === faq.id ? "bg-white text-black" : ""}`}  >
                        {active === faq.id ? <PlusIcon className={`w-6 h-6 text-gray-400`} /> : < MinusIcon className={`w-6 h-6 text-gray-400`} />}

                    </div>
                    <div className="flex flex-col gap-2">
                    <h2 className="text-white text-sm font-normal">{faq.question}</h2>
                        <p className={`text-gray-400 text-sm ${active === faq.id ? "block transition-all duration-300" : "hidden"}`}>{faq.answer}</p>
                    </div>
                    
                    
                </div>
            ))}
        </div>
    </div>;
};

export default FAQSection;
