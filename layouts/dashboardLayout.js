"use client";

import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import Navbar from '@/components/dashboard/Navbar';

const MainContent = ({ children }) => {
    const { isOpen } = useSidebar();
    
    return (
        <main className={`flex-1 min-h-screen transition-all ml-20 duration-300 ${
            isOpen ? 'md:ml-10' : 'md:ml-2' 
        }`}>
            <div className="p-6">
                <Navbar />
                {children}
            </div>
        </main>
    );
};

const DashboardLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-[#0D0B13]">
                <Sidebar />
                <MainContent>{children}</MainContent>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;