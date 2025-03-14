"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars2Icon, Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSession, user } = useUser();
  

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("Session data:", session);
      // Store the token in localStorage
      setSession(session);
      // localStorage.setItem("token", session.customToken);
    }
  }, [session]);

  return (
    <div className="flex bg-[#0D0B13] z-10 absolute top-10 left-0 w-full max-w-[800px] mx-auto right-0 justify-between items-center p-4 border border-[#0093E87D] rounded-full">
      <div>
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 items-center bg-[#0D0B13]">
        <Link href="/" className="hover:text-white px-4">
          Home
        </Link>
        <Link href="/about" className="hover:text-white px-2 py-2">
          About
        </Link>
        <Link href="/pricing" className="hover:text-white px-4">
          Pricing
        </Link>
        {!user ? (
          <Link
            href="/signin"
            className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Login / Sign up
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden cursor-pointer bg-gray-700 rounded-full p-2"
      >
        <Bars3Icon className="w-6 h-6 text-white" />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="absolute  top-0 left-0 w-full bg-gradient-to-r from-[#21ABFD] to-[#0055DE] 
          flex flex-col gap-4 z-50 rounded-xl p-4 shadow-lg transition-all duration-300"
        >
          <div className="flex justify-end">
            <XCircleIcon
              className="w-6 h-6 text-white cursor-pointer "
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex text-white flex-col gap-4">
            <Link
              href="/"
              className="hover:text-white px-4"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-white px-4"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="hover:text-white px-4"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            { !user ? (
              <Link
                href="/signin"
                className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Login / Sign up
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center gap-2  text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"

                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
