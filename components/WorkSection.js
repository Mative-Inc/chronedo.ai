import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import WorkCard from "./WorkCard";

const workCards = [
    {
        id: 1,
        icon: <UserIcon className="w-6 h-6" />,
        title: "Create an account",
        description: "Create an account to get started",
        link: "/",
    },
    {
        id: 2,
        icon: <UserIcon className="w-6 h-6" />,
        title: "Create an account",
        description: "Create an account to get started",
        link: "/",
    },
    {
        id: 3,
        icon: <UserIcon className="w-6 h-6" />,
        title: "Create an account",
        description: "Create an account to get started",
        link: "/",
    },
];

const WorkSection = () => {
    return <div className="flex flex-col gap-4 w-full max-w-[1200px] mx-auto py-[60px] px-4">

        <div className="flex flex-col md:flex-row justify-between">
            <div className="flex w-full flex-col gap-4">
                <h1 className="text-white text-4xl font-bold">How it works</h1>
                <p className="text-gray-400 text-lg">
                    Check out some of the amazing photos we've created for our users.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Link href="/" className="bg-gradient-to-r from-[#21ACFD] to-[#2174FE] px-4 py-2 flex items-center gap-2 rounded-full">Get Started <ArrowRightIcon className="w-4 h-4" /></Link>
            </div>
        </div>


        {/* cards */}
        <div className="flex flex-col md:flex-row gap-4">
            {workCards.map((card) => (
                <WorkCard key={card.id} card={card} />
            ))}
        </div>
        

    </div>;
};

export default WorkSection;
