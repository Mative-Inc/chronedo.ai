"use client"
import React, { useState } from "react";
import PricingCard from "./PricingCard";


const pricingCards = [
    {
        id: "price_1R4PjxPFeWozK4w0xh6lAuic",
        title: "Basic",
        description: "For new user",
        price: "0",
        features: [
            {id: 1, feature: "3 images/day without registeration"},
            {id: 2, feature: "5 images/day with registeration"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/",
        type: "Monthly",
    },
    {
        id: "price_1R4PnmPFeWozK4w0RDKavyji",
        title: "Premium",
        description: "For 50 Images per month",
        price: "19.99",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/",
        type: "Monthly",
    },
    {
        id: "price_1R4YtKPFeWozK4w0eJBpOoZz",
        title: "Enterprise",
        description: "For 100 images per month",
        price: "39.91",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/",
        type: "Monthly",
    },
    {
        id: "2",
        title: "Enterprise",
        description: "For the enterprise user",
        price: "29.99",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/",
        type: "Yearly",
    },
];

const PricingSection = () => {
    const [activeTab, setActiveTab] = useState("Monthly");
    const [activeCard, setActiveCard] = useState(2); // Pro plan has id: 2


    return <div className="flex flex-col items-center gap-4 w-full max-w-[1200px] mx-auto py-[60px] px-4">

        <div className="flex flex-col items-center gap-4">
            <h1 className="text-white text-4xl font-normal">Pricing</h1>
            <p className="text-gray-400 text-lg">
                Check out some of the amazing photos we've created for our users.
            </p>
        </div>


        <div className="flex items-center gap-4 bg-[#217DFE08] backdrop-blur-[70px] p-2 rounded-full w-fit mx-auto">
            <p 
                className={`text-lg font-normal px-4 py-2 cursor-pointer rounded-full transition-all ${
                    activeTab === "Monthly" ? "bg-[#217DFE21] border border-[#217DFE] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("Monthly")}
            >
                Monthly
            </p>
            
            <p 
                className={`text-lg font-normal px-4 py-2 cursor-pointer rounded-full transition-all ${
                    activeTab === "Yearly" ? "bg-[#217DFE21] border border-[#217DFE] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("Yearly")}
            >
                Yearly
            </p>
        </div>

        {/* pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {pricingCards
                .filter((card) => card.type === activeTab)
                .map((card) => (
                    <PricingCard 
                        key={card.id} 
                        card={card} 
                        active={card.id === activeCard}
                        onClick={() => setActiveCard(card.id)}
                    />
                ))
            }
        </div>
    </div>;
};

export default PricingSection;
