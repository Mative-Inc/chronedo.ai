import React from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { 
    HomeIcon, 
    UserIcon, 
    Cog6ToothIcon, 
    ArrowLeftOnRectangleIcon, 
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from "@heroicons/react/24/outline";

const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/dashboard', color: 'hover:bg-[#2174FE]' },
    { name: 'Profile', icon: UserIcon, href: '/dashboard/profile', color: 'hover:bg-[#2174FE]' },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/dashboard/settings', color: 'hover:bg-[#2174FE]' },
    { name: 'Logout', icon: ArrowLeftOnRectangleIcon, href: '/logout', color: 'hover:bg-red-600' },
];

const Sidebar = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <div 
            className={`fixed md:relative h-screen bg-[#0D0B13] bg-[#217DFE0F] transition-all duration-300 ease-in-out overflow-x-hidden ${
                isOpen ? "w-64" : "w-20"
            } border-r border-[#2174FE]/10`}
        >
            <div className="flex flex-col h-full overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#2174FE]/10">
                    <h1 className={`font-bold transition-all duration-300 ${
                        isOpen ? "text-2xl" : "text-lg"
                    } text-white`}>
                        {isOpen ? "Dashboard" : "DB"}
                    </h1>
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-[#2174FE]/10 transition-colors"
                        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isOpen ? (
                            <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                            <ChevronDoubleRightIcon className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-x-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
                                ${item.color} group relative
                                ${!isOpen && 'justify-center'}
                            `}
                        >
                            <item.icon className={`w-6 h-6 transition-transform ${
                                !isOpen && 'group-hover:scale-130 w-5 h-5'
                            }`} />
                            <span className={`whitespace-nowrap transition-all duration-300 ${
                                !isOpen && 'opacity-0 w-0'
                            }`}>
                                {item.name}
                            </span>
                            
                            {/* Tooltip for collapsed state */}
                            {!isOpen && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-[#0D0B13] text-white text-sm 
                                    rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                                    border border-[#2174FE]/10">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>

                
            </div>
        </div>
    );
};

export default Sidebar;
