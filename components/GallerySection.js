import React from "react";

const Gallery = () => {
    return <div className="flex flex-col items-center justify-center max-w-[1200px] py-15 px-4 mx-auto">
        <div className="flex flex-col gap-2 w-full items-center justify-center shadow-[0_-4px_6px_-1px_rgba(0,147,232,0.5)] rounded-lg p-4">
            <h1 className="text-white text-4xl font-bold">Gallery</h1>
            <p className="text-gray-400 text-lg">
                Check out some of the amazing photos we've created for our users.
            </p>

            <div className="grid md:grid-cols-3 grid-cols-1 sm:gridcols-2 mt-4 gap-4">
                <img src="/watch.png" alt="Gallery" className="w-full h-full object-cover rounded-lg" />
                <img src="/watch.png" alt="Gallery" className="w-full h-full object-cover rounded-lg" />
                <img src="/watch.png" alt="Gallery" className="w-full h-full object-cover rounded-lg" />

                <img src="/watch.png" alt="Gallery" className="w-full h-full object-cover rounded-lg" />
                <img src="/watch.png" alt="Gallery" className="w-full h-full object-cover rounded-lg" />
                <img src="/watch.png" alt="Gallery" className="w-full h-full object-cover rounded-lg" />
            </div>

        </div>


    </div>;
};

export default Gallery;
