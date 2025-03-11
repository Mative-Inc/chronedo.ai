import React from "react";

const VisionSection = () => {
    return <div className="flex flex-col items-center justify-center max-w-[1200px] py-15 px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-2 w-full py-10 justify-between shadow-[0_-4px_6px_-1px_rgba(0,147,232,0.5)] rounded-lg p-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-white text-4xl font-bold">Our Mission & Vision</h1>
                <p className="text-gray-400 text-lg">
                    We are a team of passionate individuals who are dedicated to providing the best possible service to our customers.
                </p>

                <p className="text-gray-400 text-lg">
                    We are a team of passionate individuals who are dedicated to providing the best possible service to our customers.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <img src="/watch.png" alt="Vision" className="w-full h-full object-cover rounded-lg" />
            </div>




        </div>


    </div>;
};

export default VisionSection;
