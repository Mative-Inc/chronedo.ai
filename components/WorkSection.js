import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import WorkCard from "./WorkCard";
import { Brain, BrainIcon, DownloadIcon } from "lucide-react";

const workCards = [
  {
    id: 1,
    icon: <UserIcon className="w-6 h-6 text-white" />,
    title: "Upload a watch photo",
    description: "Create an account to get started",
    link: "/",
  },
  {
    id: 2,
    icon: <BrainIcon className="w-6 h-6 text-white" />,
    title: "AI enhances your background",
    description: "Create an account to get started",
    link: "/",
  },
  {
    id: 3,
    icon: <DownloadIcon className="w-6 h-6 text-white" />,
    title: "Download your image",
    description: "Create an account to get started",
    link: "/",
  },
];

const WorkSection = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1200px] mx-auto py-[60px] px-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex w-full flex-col">
          <h1 className="text-white text-4xl font-bold">How it works</h1>
          <div className="flex gap-2 md:flex-row flex-col justify-end items-center md:justify-between">
            <p className="text-gray-400 text-lg">
              Check out some of the amazing photos we've created for our users.
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-[#21ACFD] to-[#2174FE] px-6 py-3 flex items-center justify-center gap-2 rounded-full text-white font-medium text-center transition-all hover:opacity-90"
            >
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="flex flex-col md:flex-row gap-4">
        {workCards.map((card) => (
          <WorkCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
