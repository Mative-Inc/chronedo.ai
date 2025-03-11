"use client";

import DashboardLayout from '@/layouts/dashboardLayout';

export default function DashboardPage() {
    return (
        // <DashboardLayout>
            <div className="flex flex-col h-screen">
                <div className='flex flex-col items-center justify-center bg-[#217DFE0F] p-4 rounded-md border border-[#2174FE]/10'>
                    <h1 className='text-2xl font-bold'>

                    Transform Your Watch Photos with <span className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold">Chronedo.AI</span>
                    </h1>
                    <p className='text-gray-500'>
                        Upload a watch photo & get a stunning background in seconds!
                    </p>

                    <select className='w-full p-2 rounded-md border border-[#2174FE]/10'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
        // </DashboardLayout>
    );
}